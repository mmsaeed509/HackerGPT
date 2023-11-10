const keyInput = document.getElementById("key");

const encryptButton = document.querySelector("input[type=submit][value=Encrypt]");
encryptButton.addEventListener("click", () => {
  const key = keyInput.value;

  // Encrypt the files using the key.
  encryptFiles(key);
});

const decryptButton = document.querySelector("input[type=submit][value=Decrypt]");
decryptButton.addEventListener("click", () => {
  const key = keyInput.value;

  // Decrypt the files using the key.
  decryptFiles(key);
});

function encryptFiles(key) {
  // Get a list of all the files in the current directory.
  const files = fs.readdirSync(".");

  // Encrypt each file using the key.
  files.forEach(file => {
    fs.writeFileSync(file, encrypt(fs.readFileSync(file), key));
  });

  // Update the status message.
  document.getElementById("status").innerHTML = "<p>Status: Encrypting files...</p>";

  // Wait for the encryption to finish.
  setTimeout(() => {
    document.getElementById("status").innerHTML = "<p>Status: Encryption complete.</p>";
  }, 1000);
}

function decryptFiles(key) {
  // Get a list of all the files in the current directory.
  const files = fs.readdirSync(".");

  // Decrypt each file using the key.
  files.forEach(file => {
    fs.writeFileSync(file, decrypt(fs.readFileSync(file), key));
  });

  // Update the status message.
  document.getElementById("status").innerHTML = "<p>Status: Decrypting files...</p>";

  // Wait for the decryption to finish.
  setTimeout(() => {
    document.getElementById("status").innerHTML = "<p>Status: Decryption complete.</p>";
  }, 1000);
}

function encrypt(data, key) {
  // Convert the data to a byte array.
  const dataBytes = new Uint8Array(data);

  // Create a new byte array to store the encrypted data.
  const encryptedBytes = new Uint8Array(dataBytes.length);
