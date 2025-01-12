import uuid from "uuid";
import grpc from "@grpc/grpc-js";
import { SpeechToText } from "../protos/speech_to_text_service.proto";
import { Audio, AudioMetaData } from "../protos/audio.proto";
import {
  User,
  Session,
  AudioMessage,
} from "../protos/speech_to_text_model.proto";
import { SpeechToTextRequest } from "../protos/speech_to_text_service.proto";


const chunkAudio = (audioBytes, chunkSize, stride) => {
  const chunks = [];
  for (let i = 0; i < audioBytes.length; i += chunkSize - stride) {
    chunks.push(audioBytes.slice(i, i + chunkSize));
  }
  return chunks;
};

//  -----TRANSCRIPTION METHOD-----
const transcribeAudioBlob = async (
  audioBlob,
  language = "en-IN",
  domain = "HEALTHCARE"
) => {
  try {
    // Convert blob to audio bytes 
    const audioBytes = await blobToWavBuffer(audioBlob);

    // ------gRPC CLIENT SETUP------
    const endpoint = "10.168.131.225:32000 ";
    const client = new SpeechToText(
      endpoint,
      grpc.credentials.createInsecure()
    );

    const idUser = uuid.v4();
    const audioChunks = chunkAudio(audioBytes, 16000, 1);
    const transcripts = [];

    for (const chunk of audioChunks) {
      const audio = new Audio({ content: chunk, uri: "test" });
      const audioMetaData = new AudioMetaData({
        lang: language,
        domain: domain,
      });
      const user = new User({ id: idUser });
      const session = new Session({ id: idUser, end: false });
      const audioMessage = new AudioMessage({
        audio,
        context: audioMetaData,
        user,
        session,
        id: 1,
      });
      const sttReq = new SpeechToTextRequest({ message: audioMessage });

      /* ----SEND STREAMING REQUEST---- */
      const responses = await new Promise((resolve, reject) => {
        const call = client.transcribe(sttReq);
        const results = [];

        call.on("data", (response) => results.push(response));
        call.on("end", () => resolve(results));
        call.on("error", (err) => reject(err));
      });

      /*   ---TRANSCRIPTION RESULTS---  */
      responses.forEach((response) => {
        const transcript = response.result.transcription.text;
        transcripts.push(transcript);
        console.log(transcript);
      });
    }

    return transcripts.join("\n");
  } catch (error) {
    throw new Error(`Transcription failed: ${error.message}`);
  }
};

export { transcribeAudioBlob };
