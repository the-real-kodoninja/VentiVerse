import { Actor, HttpAgent } from '@dfinity/agent';

export const useCanister = (canisterName: string) => {
  const agent = new HttpAgent({ host: 'https://ic0.app' }); // Mainnet
  const actor = Actor.createActor<any>(
    { service: {} }, // Placeholder IDL; generate with dfx
    { agent, canisterId: canisterName }
  );

  const call = async (method: string, args: any[] = []) => {
    return actor[method](...args);
  };

  return { call };
};