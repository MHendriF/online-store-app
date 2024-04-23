import styles from "./Input.module.scss";

type Proptypes = {
  label?: string;
  name: string;
  type: string;
  placeholder: string;
};

export default function Input(props: Proptypes) {
  const { label, name, type, placeholder } = props;
  return (
    <div className={styles.container}>
      {label && <label htmlFor={label}>{label}</label>}
      <input
        name={name}
        id={name}
        type={type}
        placeholder={placeholder}
        className={styles.container__input}
      ></input>
    </div>
  );
}
