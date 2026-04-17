import React, { useEffect, useReducer } from "react";

const Calculadora = ({ showMessage }) => {
  const isNumeric = (val) => !isNaN(val) && val.trim() !== "";
  const arrButtons = [
    "AC",
    "%",
    "<==",
    "/",
    "7",
    "8",
    "9",
    "*",
    "4",
    "5",
    "6",
    "-",
    "1",
    "2",
    "3",
    "+",
    "+/-",
    "0",
    ".",
    "=",
  ];
  const [state, dispatch] = useReducer(
    (state, action) => {
      if (isNumeric(action.type)) {
        // el . se considera como nro también
        return {
          ...state,
          operation: state.operation + action.type,
          lastSymbol: state.lastSymbol + action.type,
        };
      }

      switch (action.type) {
        case "%":
        case "/":
        case "*":
        case "+":
          if (isNumeric(state.lastSymbol)) {
            return {
              ...state,
              operation: state.operation + action.type,
              lastSymbol: action.type,
            };
          }
          return state;
        case "-":
          if (isNumeric(state.lastSymbol)) {
            return {
              ...state,
              operation: state.operation + action.type,
              lastSymbol: action.type,
            };
          }
          return state;
        case "AC":
          return {
            operation: "",
            resultado: 0,
            currentOperator: "",
            lastSymbol: "",
          };
        case "+/-":
          return state;
        case "=":
          try {
            const expresion = state.operation.replace(/%/g, "/100");
            // console.log(expresion);
            const result_str = eval(expresion).toString();
            return {
              operation: result_str,
              lastSymbol: result_str,
            };
          } catch (error) {
            showMessage("error", "Error", "Invalid operation");
            return state;
          }

        case "<==":
          try {
            return {
              ...state,
              operation: state.operation.slice(0, -1),
              lastSymbol: state.lastSymbol.slice(0, -1),
            };
          } catch (error) {
            // showMessage("error", "Error", "Invalid operation");
            return state;
          }
          return state;

        default:
          return state;
      }
    },
    { operation: "", lastSymbol: "" },
  );

  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <div className="m-auto flex flex-col gap-2 border p-3 rounded-lg">
      <div className="flex justify-end overflow-x-auto">
        <p>{state.operation.length > 0 ? state.operation : "0"}</p>
      </div>
      <div className="flex justify-end text-3xl overflow-x-auto">
        <p>{isNumeric(state.lastSymbol) ? state.lastSymbol : "0"}</p>
      </div>
      <div className="grid grid-cols-4 gap-0.5">
        {arrButtons.map((b) => (
          <button
            key={crypto.randomUUID()}
            onClick={() => dispatch({ type: b })}
            className="bg-black text-white text-center text-2xl px-4 py-3 cursor-pointer rounded-lg"
          >
            {b}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calculadora;
