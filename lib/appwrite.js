import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.josephalforque.joe",
  projectId: "666d33850010dc7ffb98",
  databaseId: "666d35c700297c4b9f19",

  userCollectionId: "666d360b000ca12f430c",
  videoCollectionId: "666d363f003be6b332c7",

  storageId: "666d397d0009f2b03584",
};

const {
  endpoint,
  platform,
  projectId,
  databaseId,
  userCollectionId,
  videoCollectionId,
  storageId,
} = appwriteConfig;

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(endpoint) // Your Appwrite Endpoint
  .setProject(projectId) // Your project ID
  .setPlatform(platform); // Your application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);
// Register User
export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      databaseId,
      userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        username: username,
        email: email,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const signIn = async (email, password) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    throw new Error(error);
  }
};

export const signOut = async (email, password) => {
  try {
    
    const session = await account.deleteSession('current');
    return session;
  } catch (error) {
    throw new Error(error);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    // console.log(currentAccount);
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      databaseId,
      userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];

    // return currentAccount;
  } catch (error) {
    console.log(error);
  }
};

export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(databaseId, videoCollectionId);
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const getLatestPosts = async () => {
  try {
    const posts = await databases.listDocuments(databaseId, videoCollectionId, [Query.orderAsc("$createdAt"), Query.limit(7)]);

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const searchPosts = async (query) => {
  try {
    const posts = await databases.listDocuments(databaseId, videoCollectionId, [Query.search('title', query)]);

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const getUserPost = async (accountId) => {
  try {
    const posts = await databases.listDocuments(databaseId, videoCollectionId, [Query.equal('creator', accountId)]);

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const uploadFile = async (file, type) => {
  if (!file) return;
  console.log('F I L E', file)
  const asset = { name: file.fileName, type: file.mimeType , size: file.fileSize, uri:file.uri}

  try {
    const uploadedFile = await storage.createFile(storageId, ID.unique(), asset )

    const fileUrl = await getFilePreview(uploadedFile.$id, type)

  console.log('F I L E URL', fileUrl)


    return fileUrl;
  } 
  catch (error) {
    throw new Error(error);
  }
}

export const getFilePreview = async (fileId, type) => {
  let fileUrl;

  try {
    if (type === "video") {
      fileUrl = storage.getFileView(storageId, fileId)
    } else if (type === 'image') {
      fileUrl = storage.getFilePreview(storageId, fileId, 2000, 2000, 'top', 100)
    }
    else {
      throw new Error("Invalid File type")
    }

    if (!fileUrl) {
      throw new Error;
    }

    return fileUrl;
    } catch (error) {
    throw new Error(error);
  }
}


export const createVideo = async (form) => {
  try {
    const [thumbnailUrl, videoUrl] = await Promise.all([uploadFile(form.thumbnail, "image"), uploadFile(form.video, "video")]);

    const newPost = await databases.createDocument(databaseId, videoCollectionId, ID.unique(), {
      title:form.title,
      thumbnail: thumbnailUrl,
      video: videoUrl,
      prompt: form.prompt,
      creator: form.userId
    });

    return newPost;
  }
  catch (error) {
    throw new Error(error);
  }
}