import { Vault } from "../vault"; 

export const createSecrets = async (walletAddress: string) => {
  //This turns into a state tree of private data 
  return Vault.getModules(walletAddress);
}