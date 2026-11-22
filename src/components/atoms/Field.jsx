// Campo de formulário com rótulo visível. kind: 'input' | 'textarea' | 'select'
export default function Field({ id, label, kind = 'input', options = [], ...rest }) {
  return (
    <div className="field">
      <label htmlFor={id} className="field__label">
        {label}
      </label>
      {kind === 'textarea' && <textarea id={id} name={id} rows={4} className="field__control" {...rest} />}
      {kind === 'select' && (
        <select id={id} name={id} className="field__control" {...rest}>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      )}
      {kind === 'input' && <input id={id} name={id} className="field__control" {...rest} />}
      <span className="field__line" aria-hidden="true" />
    </div>
  );
}
