import { useMemo, useRef, Fragment } from "react";
import { createPortal } from "react-dom";

function DynamicRenderFields({
  data,
  values,
  onChange,
  parentIs,
  container,
}) {  
  return data
    .filter(
      (i) =>
        (!parentIs && i.relations.length === 0) ||
        i.relations.includes(parentIs)
    )
    .map((item) => {
      if (item.type === "text") return <input placeholder={item.name} name={item.id} key={item.id} value={values[item.id]} onChange={onChange} />;
      if (item.type === "option") return (
        <option value={item.id} key={item.id}>
            {item.name}
            {values[parentIs] === item.id.toString() && createPortal(<DynamicRenderFields
              data={data}
              values={values}
              onChange={onChange}
              parentIs={item.id}
            />, container)}
        </option>
      );
      if (item.type === "select")
        return (
          <select key={item.id} name={item.id} onChange={onChange} value={values[item.id]}>
            <option value=''>Selecione</option>
            <DynamicRenderFields
              data={data}
              values={values}
              onChange={onChange}
              parentIs={item.id}
              container={container}
            />
          </select>
        );
    });
}
export default DynamicRenderFields;
