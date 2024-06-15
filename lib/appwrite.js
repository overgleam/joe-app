import { Account, Client } from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.josephalforque.joe",
  projectId: "666d33850010dc7ffb98",
  databaseId: "666d35c700297c4b9f19",

  userCollectionId: "666d360b000ca12f430c",
  videoCollectionId: "666d363f003be6b332c7",

  storageId: "666d397d0009f2b03584",
};

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
  .setProject(appwriteConfig.projectId) // Your project ID
  .setPlatform(appwriteConfig.platform); // Your application ID or bundle ID.

const account = new Account(client);

// Register User
export const createUser = () => {
  account.create(ID.unique(), "me@example.com", "password", "Jane Doe").then(
    function (response) {
      console.log(response);
    },
    function (error) {
      console.log(error);
    }
  );
};
