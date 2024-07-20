import SuccessView from "@/components/views/Transaction/Success";
import { ToasterContext } from "@/contexts/ToasterContext";
import transactionServices from "@/services/transaction";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

export default function TransactionSuccessPage() {
  const { query, isReady } = useRouter();
  const { setToaster } = useContext(ToasterContext);

  const checkPayment = async () => {
    await transactionServices.updateTransaction(query.order_id as string);
    //const { data } = await transactionServices.getTransaction(query.order_id as string);
    //console.log("🚀 ~ checkPayment ~ data:", data);
  };

  useEffect(() => {
    if (isReady) {
      checkPayment();
    }
  }, [isReady]);

  return (
    <>
      <SuccessView />
    </>
  );
}
