const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const fs = require("fs");
const { WaveFile } = require("wavefile");
const { v4: uuidv4 } = require("uuid");

// Path to the main proto file (adjust based on your structure)
const PROTO_PATH = "./protos/speech_to_text.proto";

// Load gRPC proto with all necessary imports
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
  includeDirs: ["./protos"], // Specify the directory that contains all .proto files
});

// Load the package definition and get the service
const proto = grpc.loadPackageDefinition(packageDefinition).speech_to_text;

// gRPC server address
const address = "10.168.131.225:32000";
const client = new proto.SpeechToText(
  address,
  grpc.credentials.createInsecure()
);

// Function to chunk audio
function chunkAudio(audioBytes, chunkSize) {
  const chunks = [];
  for (let i = 0; i < audioBytes.length; i += chunkSize) {
    chunks.push(audioBytes.slice(i, i + chunkSize));
  }
  return chunks;
}

// ------MAIN TRANSCRIPTION FUNCTION------
async function transcribeAudio(filePath) {
  const wavData = fs.readFileSync(filePath);
  const wav = new WaveFile(wavData);
  const audioBytes = wav.data.samples;

  const id_user = uuidv4(); // Generate unique user ID
  const language = "en-IN"; // Language
  const domain = "HEALTHCARE"; // Domain
  const audioChunks = chunkAudio(audioBytes, 16000); // Audio chunk size

  const results = [];

  // Loop through chunks and send them to the gRPC server
  for (let audioChunk of audioChunks) {
    const audio = { content: audioChunk, uri: "test" };
    const audio_meta_data = { lang: language, domain: domain };
    const user = { id: id_user };
    const session = { id: id_user, end: false };

    const audioMessage = {
      audio: audio,
      context: audio_meta_data,
      user: user,
      session: session,
      id: 1,
    };

    const sttReq = { message: audioMessage };

    await new Promise((resolve, reject) => {
      client.transcribe([sttReq], (err, response) => {
        if (err) {
          console.error("gRPC Error:", err);
          reject(err);
        } else {
          results.push(response.result.transcription.text);
          resolve();
        }
      });
    });
  }

  // ----------RETURN THE FINAL TRANSCRIPTION RESULT----------
  return results.join(" ");
}

module.exports = transcribeAudio;
