import styles from "./Select.module.scss";

type Option = {
  label: string;
  value: string;
  selected?: boolean;
};

type Proptypes = {
  label?: string;
  name: string;
  defaultValue?: string;
  disabled?: boolean;
  options: Option[] | any;
  className?: string;
};

export default function Select(props: Proptypes) {
  const { label, name, defaultValue, disabled, options, className } = props;
  return (
    <div className={styles.container}>
      <label htmlFor={name}>{label}</label>
      <select
        name={name}
        id={name}
        defaultValue={defaultValue}
        disabled={disabled}
        className={styles.container__select}
      >
        {options.map((option: Option) => (
          <option
            key={option.value}
            value={option.value}
            selected={option.selected}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
