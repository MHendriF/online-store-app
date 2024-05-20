import styles from "./Input.module.scss";

type Proptypes = {
  label?: string;
  name: string;
  type: string;
  placeholder?: string;
  defaultValue?: string | number;
  disabled?: boolean;
  onChange?: (e: any) => void;
  className?: string;
};

export default function Input(props: Proptypes) {
  const {
    label,
    name,
    type,
    placeholder,
    defaultValue,
    disabled,
    onChange,
    className,
  } = props;
  return (
    <div className={`${styles.container} ${className}`}>
      {label && (
        <label htmlFor={label} className={styles.container__label}>
          {label}
        </label>
      )}
      <input
        name={name}
        id={name}
        type={type}
        placeholder={placeholder}
        className={styles.container__input}
        defaultValue={defaultValue}
        disabled={disabled}
        onChange={onChange}
      ></input>
    </div>
  );
}
