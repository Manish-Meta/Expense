const { BlobServiceClient } = require("@azure/storage-blob");

const blobServiceClient = BlobServiceClient.fromConnectionString(
  process.env.AZURE_STORAGE_CONNECTION_STRING
);

const uploadToAzureBlob = async (file) => {
  const containerName = process.env.AZURE_STORAGE_CONTAINER;
  const containerClient = blobServiceClient.getContainerClient(containerName);

  await containerClient.createIfNotExists({
    access: "private",
  });


  const blobName = `${Date.now()}-${file.originalname}`;
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  await blockBlobClient.uploadData(file.buffer, {
    blobHTTPHeaders: {
      blobContentType: file.mimetype,
    },
  });

  return blockBlobClient.url; 
};

module.exports = { uploadToAzureBlob };
