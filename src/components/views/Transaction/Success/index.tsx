import Button from "@/components/ui/Button";
import style from "./Success.module.scss";

export default function SuccessView() {
  return (
    <div className={style.success}>
      <h1>Payment Success</h1>
      <Button type="button">Check Your Order Here</Button>
    </div>
  );
}
