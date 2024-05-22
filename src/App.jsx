import React, { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { v4 as uuidv4 } from "uuid"; //id değerleri için npm uuid'den indirilen paket
import { FaRegSquare } from "react-icons/fa";
import { FaRegSquareCheck } from "react-icons/fa6";
//--toastify---
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//--mode icons
import { IoSunnyOutline } from "react-icons/io5";
import { FiMoon } from "react-icons/fi";

import "./App.css";

function App() {
  const [value, setValue] = useState("");
  const [todoArray, setTodoArray] = useState([]);
  const [editMode, setEditMode] = useState(false); //düzenleme işlemi yaplıp yapılmadığını belirlemek için(add butonunu update veya add olarak değiştirmek için)
  const [editItemId, setEditItemId] = useState(); //düzenlenen todo'nun id'sini tutmak için
  const [isDarkMode, setIsDarkMode] = useState(false);
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  //her todo için random bir background rengi seçmek için kod
  const randomTodoColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

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
        toast.success("Updated your task!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        //düzenleme modu false ise ekleme işlemi için add butonu aktiftir
      } else {
        const newItem = {
          id: uuidv4(),
          item: value,
          status: "Active",
          backgroundColor: randomTodoColor(),
        };
        setTodoArray([...todoArray, newItem]);
        toast.info("New task added!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
      setValue(""); //değer eklendikten sonra inputun içini boşaltıyoruz
    } else if (value === "") {
      toast.error("You did not add value!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };
  //enter'a basınca listeye todo eklesin diye
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      add();
    }
  };
  //---------------SİLME İÇİN GEREKLİ FONKSİYONLAR----------------
  const deleteItem = (id) => {
    const newArr = todoArray.filter(
      (item) => item.id !== id
    ); /*todoArray silme işlemi için kullanılıyor, filter ile Array filtreleniyor seçtiğim id'yi kontrol ediyor silmek için filtreliyor eşleşmeyen todo'lar newArrye atanıyor kalan yani seçilen todoArray'de kalıyor ve siliniyor */

    toast.success("Your task deleted!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

    setTodoArray(newArr); //güncel Arrayyi set ediyoruz
  };

  //---------------EKLEME VE GÜNCELLEME İÇİN GEREKLİ FONKSİYONLAR---------------------
  const editItem = (id) => {
    const updateItem = todoArray.find((item) => item.id === id); //düzenlenecek id'yi buluyoruz.
    setValue(updateItem.item); //seçilen düzenlenecek todo inputta görüntülenir
    setEditMode(true);
    setEditItemId(id);
  };
  const itemStatus = (id) => {
    let status =
      todoArray.filter((item) => item.id === id)[0].status === "Active" //seçtiğim todo Arraynin 0. yani ilk elemanı Active ise Resolved olarak değitiriyorum değilse Active olarak değiştiriyorum
        ? "Resolved"
        : "Active";
    setTodoArray((item) =>
      item.map((item) => (item.id === id ? { ...item, status } : item))
    );
    if (status === "Resolved") {
      toast.success("Your task is completed!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      toast.error("Your task is not completed!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };
  const tooggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };
  return (
    <>
      <div className="flex justify-end p-7 m-4">
        <button
          onClick={tooggleTheme}
          className="p-4 bg-blue-500 dark:bg-white rounded-full text-white dark:text-blue-500 md:w-16 md:h-16 flex items-center justify-center text-lg md:text-3xl"
        >
          {isDarkMode ? <IoSunnyOutline /> : <FiMoon />}
        </button>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="flex items-center justify-center m-5 ">
        <div className="border border-cyan-900 rounded-2xl bg-slate-500 shadow-xl shadow-slate-800 dark:border-white dark:bg-slate-300 dark:shadow-xl dark:shadow-slate-500 ">
          <h1 className="text-3xl md:text-5xl text-white dark:text-blue-700 text-center m-3 pt-4 ">
            TODO LIST
          </h1>
          <div className="flex items-center justify-center">
            <textarea
              type="text"
              placeholder="Add todo..."
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKeyPress}
              className="border-2 p-3 outline-none rounded-xl text-md md:text-2xl text-gray-600 resize-none w-[56%] h-14 md:w-[70%] md:h-16 m-3 dark:border-blue-500"
            />
            <button
              onClick={add}
              className="bg-blue-500 text-white text-lg md:text-2xl m-2 p-4 rounded-2xl w-16 md:w-28 h-14 md:h-16 hover:bg-blue-400 flex items-center justify-center"
            >
              {editMode ? "Update" : "Add"}
            </button>
          </div>
          <div className="flex items-center justify-center">
            <ul className="m-5 p-3 rounded break-words flex  justify-center flex-wrap">
              {todoArray.map((item) => (
                <li
                  key={item.id}
                  style={{ backgroundColor: item.backgroundColor }}
                  className={`text-gray-300 flex items-center m-1 border-2 rounded-xl w-[300px] lg:w-1/4 p-4`}
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

                    {/*üzeri çizilen yani tamamlanan bir todo üzerinde düzenleme işlemi yapılamasın diye */}
                    {item.status !== "Resolved" && (
                      <MdEdit
                        className="cursor-pointer text-lg md:text-3xl ml-1"
                        onClick={() => editItem(item.id)}
                      />
                    )}

                    {item.status === "Active" && (
                      <FaRegSquare
                        className="cursor-pointer text-lg md:text-3xl ml-1"
                        onClick={() => itemStatus(item.id)}
                      />
                    )}
                    {item.status === "Resolved" && (
                      <FaRegSquareCheck
                        className="cursor-pointer text-lg md:text-3xl ml-1"
                        onClick={() => itemStatus(item.id)}
                      />
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
