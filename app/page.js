"use client";
import React, { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  query,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "./firebase";

export default function Home() {
  //estado para items, estado para total y para new Item
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", price: "" });
  const [total, setTotal] = useState(0);

  //add item database
  const addItem = async (e) => {
    e.preventDefault();
    if (newItem.name !== "" && newItem.price !== "") {
      //Agrega los items a la db de firebase
      await addDoc(collection(db, "items"), {
        name: newItem.name.trim(),
        price: newItem.price,
      });
      setNewItem({ name: "", price: "" });
    }
  };
  //read item database
  useEffect(() => {
    const q = query(collection(db, "items"));
    const unsusbscribe = onSnapshot(q, (QuerySnapshot) => {
      let itemsArr = [];

      QuerySnapshot.forEach((doc) => {
        //se obtiene la data y se ingresa en la variable creada en esta función
        itemsArr.push({ ...doc.data(), id: doc.id });
      });

      setItems(itemsArr);

      // Read total from itemarr
      const calculateTotal = () => {
        const totalPrice = itemsArr.reduce(
          (sum, item) => sum + parseFloat(item.price),
          0
        );
        setTotal(totalPrice);
      };
      calculateTotal();
      return () => unsusbscribe();
    });
  }, []);

  //Delete item database
  const deleteItem = async (id) => {
    await deleteDoc(doc(db, "items", id));
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between sm:p-24 p-4">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm ">
        <h1 className="text-4xl p-4 text-center">Lista de gastos</h1>
        <div className="bg-cyan-900 p-4 rounded-lg">
          <form className="grid grid-cols-6 items-center text-black">
            <input
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              className="col-span-3 p-3 border"
              type="text"
              placeholder="Ingrese el nombre"
            />
            <input
              value={newItem.price}
              onChange={(e) =>
                setNewItem({ ...newItem, price: e.target.value })
              }
              className="col-span-2 p-3 border mx-3"
              type="number"
              placeholder="Ingrese el costo ₡"
            />
            <button onClick={addItem} className="p-3 text-xl" type="submit">
              ✅
            </button>
          </form>
          <ul>
            {items.map((item, id) => (
              <li
                key={id}
                className="my-4 w-full flex justify-between bg-slate-300 text-black"
              >
                <div className="p-4 w-full flex justify-between">
                  <span className="capitalize">{item.name}</span>
                  <span>₡{item.price}</span>
                </div>
                <button
                  onClick={() => deleteItem(item.id)}
                  className="ml-8 p-4 border-l-2 border-red-800 hover:bg-red-500 w-16"
                >
                  X
                </button>
              </li>
            ))}
          </ul>
          {items.length < 1 ? (
            ""
          ) : (
            <div className="flex justify-between p-3">
              <span>Total</span>
              <span>₡{total}</span>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
