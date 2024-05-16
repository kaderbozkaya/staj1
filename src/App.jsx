import React, { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { MdEdit, MdDone } from 'react-icons/md';
import { v4 as uuidv4 } from 'uuid'; //id değerleri için npm uuid'den indirilen paket
import './App.css';

function App() {
    const [deger, setDeger] = useState('');
    const [todoDizi, setTodoDizi] = useState([]);

    const ekle = () => {
        if (deger.trim() !== '') { //eğer değer boşluk karakterlerinden arınmış bir şekildeyse ve boş bir değer değilse sıraya ekle değeri

      //----------------EKLEME İÇİN GEREKLİ FONKSİYON---------------
            const yeniEklenen = {
                id: uuidv4(), 
                item: deger
            };
            setTodoDizi([...todoDizi, yeniEklenen]);
            setDeger(''); //değer eklendikten sonra inputun içini boşaltıyoruz
        }
    };
    //---------------SİLME İÇİN GEREKLİ FONKSİYON----------------
    const itemSil=(id)=> {
      const yeniDizi=todoDizi.filter(item=>item.id !==id)  /*todoDizi silme işlemi için kullanılıyor, filter ile dizi filtreleniyor seçtiğim id'yi kontrol ediyor silmek için filtreliyor eşleşmeyen todo'lar yeniDiziye atanıyor kalan yani seçilen todoDizi'de kalıyor ve siliniyor */
      
      setTodoDizi(yeniDizi) //güncel diziyi set ediyoruz
    }

  //-----------------DÜZENLEME İÇİN GEREKLİ FONKSİYON-----------

    return (
        <>
            <h1 className='text-3xl text-blue-500'>TODO LIST</h1>
            <input
                type='text'
                placeholder='Todo ekle...'
                value={deger}
                onChange={e => setDeger(e.target.value)}
                className='border-2 p-2 outline-none rounded'
            />
            <button
                onClick={ekle}
                className='bg-blue-400 text-white text-lg m-3 p-2 rounded'
            >
                Ekle
            </button>
            <div>
                <ul className='bg-blue-600 m-7 p-5 rounded'>
                    {todoDizi.map((item) => (
                        <li key={item.id} className='text-white flex items-center justify-center m-3 border-2 rounded'>
                            <p>{item.item}</p>
                            <span className='flex justify-between p-3'>
                                <FaTrashAlt className='cursor-pointer'
                                onClick={()=>itemSil(item.id)}/>
                                <MdEdit className='cursor-pointer '/>
                                <MdDone className='cursor-pointer '/>
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default App;
