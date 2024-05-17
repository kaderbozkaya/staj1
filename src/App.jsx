import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { v4 as uuidv4 } from "uuid"; //id değerleri için npm uuid'den indirilen paket
import { ImSad } from "react-icons/im";
import { HiOutlineEmojiHappy } from "react-icons/hi";

import "./App.css";

function App() {
  const [deger, setDeger] = useState("");
  const [todoDizi, setTodoDizi] = useState([]);
  const [duzenlemeModu, setDuzenlemeModu] = useState(false); //düzenleme işlemi yaplıp yapılmadığını belirlemek için(ekle butonunu düzenleme veya ekle olarak değiştirmek için)
  const [duzenlenenItem, setDuzenlenenItem] = useState(); //düzenlenen todo'nun id'sini tutmak için

  const ekle = () => {
    if (deger.trim() !== "") {
      //eğer değer boşluk karakterlerinden arınmış bir şekildeyse ve boş bir değer değilse sıraya ekle değeri
      //düzenleme modu aktifse yani true ise
      if (duzenlemeModu) {
        setTodoDizi(
          todoDizi.map((item) =>
            item.id === duzenlenenItem ? { ...item, item: deger } : item
          )
        ); //todoDizi listesindeki todoları günceller düzenlenen todoyu yeni değerle değiştirir
        setDuzenlemeModu(false); //işlem bitinde düzenleme modu false yapılır
        setDuzenlenenItem();
        //düzenleme modu false ise ekleme işlemi için ekle butonu aktiftir
      } else {
        const yeniEklenen = {
          id: uuidv4(),
          item: deger,
          durum: "Aktif",
        };
        setTodoDizi([...todoDizi, yeniEklenen]);
      }
      setDeger(""); //değer eklendikten sonra inputun içini boşaltıyoruz
    }
  };
  //---------------SİLME İÇİN GEREKLİ FONKSİYON----------------
  const itemSil = (id) => {
    const yeniDizi = todoDizi.filter(
      (item) => item.id !== id
    ); /*todoDizi silme işlemi için kullanılıyor, filter ile dizi filtreleniyor seçtiğim id'yi kontrol ediyor silmek için filtreliyor eşleşmeyen todo'lar yeniDiziye atanıyor kalan yani seçilen todoDizi'de kalıyor ve siliniyor */

    setTodoDizi(yeniDizi); //güncel diziyi set ediyoruz
  };

  const itemDuzenle = (id) => {
    const duzenlenecekItem = todoDizi.find((item) => item.id === id); //düzenlenecek id'yi buluyoruz.
    setDeger(duzenlenecekItem.item); //seçilen düzenlenecek todo inputta görüntülenir
    setDuzenlemeModu(true);
    setDuzenlenenItem(id);
  };
  const itemDurum = (id) => {
    let durum =
      todoDizi.filter((item) => item.id === id)[0].durum === "Aktif" //seçtiğim todo dizinin 0. yani ilk elemanı aktifse tamamlandı olarak değitiriyorum değilse aktif olarak değiştiriyorum
        ? "Tamamlandı"
        : "Aktif";
    setTodoDizi((item) =>
      item.map((item) => (item.id === id ? { ...item, durum } : item))
    );
  };

  return (
    <>
      <h1 className="text-4xl text-white">TODO LIST</h1>
      <input
        type="text"
        placeholder="Todo ekle..."
        value={deger}
        size={40}
        onChange={(e) => setDeger(e.target.value)}
        className="border-2 p-2 outline-none rounded"
      />
      <button
        onClick={ekle}
        className="bg-blue-400 text-white text-xl m-3 p-2 rounded"
      >
        {duzenlemeModu ? "Güncelle" : "Ekle"}
      </button>
      <div>
        <ul className="m-7 p-5 rounded break-words ">
          {todoDizi.map((item) => (
            <li
              key={item.id}
              className={`text-white flex items-center justify-between m-3 border-2 rounded ${
                item.durum === "Tamamlandı" ? "bg-green-800" : ""
              }`}
            >
              <p
                className={`break-all m-3 ${
                  item.durum === "Tamamlandı" ? "line-through" : ""
                }`}
              >
                {item.item}
              </p>
              <span className="flex justify-between p-3 m-3">
                <FaTrashAlt
                  className="cursor-pointer text-2xl "
                  onClick={() => itemSil(item.id)}
                />
                <MdEdit
                  className="cursor-pointer text-2xl ml-1"
                  onClick={() => itemDuzenle(item.id)}
                />
                {item.durum === "Aktif" && (
                  <ImSad
                    className="cursor-pointer text-2xl ml-1"
                    onClick={() => itemDurum(item.id)}
                  />
                )}
                {item.durum === "Tamamlandı" && (
                  <HiOutlineEmojiHappy
                    className="cursor-pointer text-2xl ml-1"
                    onClick={() => itemDurum(item.id)}
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
