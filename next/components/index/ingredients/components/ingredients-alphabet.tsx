import { useEffect, useState } from 'react';
import { useIngredientContext } from '../providers/ingredient-provider';

interface PropsType extends ReactProps {
  
}

const genCharArray = (charA, charZ) => {
  var a = [],
    i = charA.charCodeAt(0),
    j = charZ.charCodeAt(0);
  for (; i <= j; ++i) {
    a.push(String.fromCharCode(i));
  }
  return a;
};
export function IngredientsAlphabet(props: PropsType) {

  const [charArray, setCharArray] = useState([]);
  useEffect(() => {
    setCharArray(genCharArray('A', 'Z'))
  }, []);
  
  const { initial, setInitial } = useIngredientContext()

  return <>
      <div className="flex flex-col lg:flex-row items-center">
        <span className="text-primary font-semibold mr-3">Danh sách hợp chất </span>
        <span className="flex flex-wrap justify-center mt-1">
          {
              charArray.map((char, index) => (
                  <span key={index} className={`mb-1 flex-center cursor-pointer font-semibold p-0 rounded-full w-7 h-7 text-primary-700 ${
                    initial == char?' bg-primary text-white underline':'hover:underline hover:text-primary'
                  } `}
                  onClick={() => setInitial(char)}>{char}</span>
              ))
          }
        </span>
      </div>
  </>
}