import snap from "./init";

const createTransaction = async (params: any, callback: Function) => {
  snap.createTransaction(params).then((transaction: { token: string; redirect_url: string }) => {
    callback(transaction);
  });
};

export default createTransaction;
