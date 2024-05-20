import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { v4 as uuidv4 } from "uuid"; //id değerleri için npm uuid'den indirilen paket
import { FaRegSquare } from "react-icons/fa";
import { FaRegSquareCheck } from "react-icons/fa6";

import "./App.css";

function App() {
  const [value, setValue] = useState("");
  const [todoArray, setTodoArray] = useState([]);
  const [editMode, setEditMode] = useState(false); //düzenleme işlemi yaplıp yapılmadığını belirlemek için(add butonunu update veya add olarak değiştirmek için)
  const [editItemId, setEditItemId] = useState(); //düzenlenen todo'nun id'sini tutmak için

  const add = () => {
    if (value.trim() !== "") {
      //eğer değer boşluk karakterlerinden arınmış bir şekildeyse ve boş bir değer değilse sıraya add değeri
      //düzenleme Mode Active ise yani true ise
      if (editMode) {
        setTodoArray(
          todoArray.map((item) =>
            item.id === editItemId ? { ...item, item: value } : item
          )
        ); //todoArray listesindeki todoları günceller düzenlenen todoyu yeni değerle değiştirir
        setEditMode(false); //işlem bitinde düzenleme modu false yapılır
        setEditItemId();
        //düzenleme modu false ise ekleme işlemi için add butonu aktiftir
      } else {
        const newItem = {
          id: uuidv4(),
          item: value,
          status: "Active",
        };
        setTodoArray([...todoArray, newItem]);
      }
      setValue(""); //değer eklendikten sonra inputun içini boşaltıyoruz
    }
  };
  const handleKeyPress = (e) => {
    //enter'a basınca listeye todo eklesin diye
    if (e.key === "Enter") {
      add();
    }
  };
  //---------------SİLME İÇİN GEREKLİ FONKSİYONLAR----------------
  const deleteItem = (id) => {
    const newArr = todoArray.filter(
      (item) => item.id !== id
    ); /*todoArray silme işlemi için kullanılıyor, filter ile Array filtreleniyor seçtiğim id'yi kontrol ediyor silmek için filtreliyor eşleşmeyen todo'lar newArrye atanıyor kalan yani seçilen todoArray'de kalıyor ve siliniyor */

    setTodoArray(newArr); //güncel Arrayyi set ediyoruz
  };

  //---------------EKLEME VE GÜNCELLEME İÇİN GEREKLİ FONKSİYONLAR---------------------
  const editItem = (id) => {
    const updateItem = todoArray.find((item) => item.id === id); //düzenlenecek id'yi buluyoruz.
    setValue(updateItem.item); //seçilen düzenlenecek todo inputta görüntülenir
    setEditMode(true);
    setEditItemId(id);
  };
  const itemstatus = (id) => {
    let status =
      todoArray.filter((item) => item.id === id)[0].status === "Active" //seçtiğim todo Arraynin 0. yani ilk elemanı Active ise Resolved olarak değitiriyorum değilse Active olarak değiştiriyorum
        ? "Resolved"
        : "Active";
    setTodoArray((item) =>
      item.map((item) => (item.id === id ? { ...item, status } : item))
    );
  };

  return (
    <>
      <h1 className="text-2xl md:text-4xl  text-white text-center m-3">
        TODO LIST
      </h1>
      <div className="flex items-center justify-center">
        <input
          type="text"
          placeholder="Add todo..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyPress}
          className="border-2 p-4 outline-none rounded-2xl w-44 md:w-80 h-8 md:h-12 text-lg md:text-2xl text-gray-600"
        />
        <button
          onClick={add}
          className="bg-blue-300 text-white text-lg md:text-2xl m-2 p-4 rounded-2xl w-20 md:w-28 h-9 md:h-12 hover:bg-blue-400 flex items-center justify-center"
        >
          {editMode ? "Update" : "Add"}
        </button>
      </div>
      <div className="flex items-center justify-center">
        <ul className="m-5 p-3 rounded break-words flex flex-col items-center justify-center ">
          {todoArray.map((item) => (
            <li
              key={item.id}
              className={`text-white flex items-center justify-between m-1  border-2 rounded-xl w-[315px] md:w-[700px]  ${
                item.status === "Resolved" ? "bg-green-400" : ""
              }`}
            >
              <p
                className={`break-all m-1 text-lg md:text-3xl ${
                  item.status === "Resolved" ? "line-through" : ""
                }`}
              >
                {item.item}
              </p>
              <span className="flex justify-between p-1 m-1">
                <FaTrashAlt
                  className="cursor-pointer text-lg md:text-3xl"
                  onClick={() => deleteItem(item.id)}
                />
                <MdEdit
                  className="cursor-pointer text-lg md:text-3xl ml-1"
                  onClick={() => editItem(item.id)}
                />

                {item.status === "Active" && (
                  <FaRegSquare
                    className="cursor-pointer text-lg md:text-3xl ml-1"
                    onClick={() => itemstatus(item.id)}
                  />
                )}
                {item.status === "Resolved" && (
                  <FaRegSquareCheck
                    className="cursor-pointer text-lg md:text-3xl ml-1"
                    onClick={() => itemstatus(item.id)}
                  />
                )}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
