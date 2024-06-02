import styles from "./Textarea.module.scss";

type PropTypes = {
  label?: string;
  name: string;
  placeholder?: string;
  defaultValue?: string | number;
  disabled?: boolean;
  onChange?: (e: any) => void;
  className?: string;
};

export default function Textarea(props: PropTypes) {
  const {
    label,
    name,
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
      <textarea
        name={name}
        id={name}
        placeholder={placeholder}
        className={styles.container__input}
        defaultValue={defaultValue}
        disabled={disabled}
        onChange={onChange}
      ></textarea>
    </div>
  );
}
