import React, { useState, useEffect } from "react";
import styles from "./App.module.css";
import logo from "./assets/images/logo.svg";
// import robots from './mock/robots.json'
import Robot from "./components/Robot";
import RobotDiscount from "./components/RobotDiscount";
import ShoppingCart from "./components/ShoppingCart";

interface Props {}

interface State {
  robotGallery: any[];
  count: number;
}

const App: React.FC<Props> = (props) => {
  const [count, setCount] = useState<number>(0);
  const [robotGallery, setRobotGallery] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>()

  useEffect(() => {
    document.title = `点击${count}次`;
  }, [count]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const responses = await fetch(
          "http://jsonplaceholder.typicode.com/users"
        );
        const data = await responses.json();
        setRobotGallery(data);
        setLoading(false);
      } catch (error) {
        setError(error.message)
      }
      // .then(response => response.json()).then(data => {
      //   setRobotGallery(data)
      // })
    };
    fetchData();
  }, []);

  return (
    <div className={styles.app}>
      <div className={styles.appHeader}>
        <img className={styles.appLogo} src={logo} alt="" />
        <h1>机器人购物平台</h1>
      </div>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Click
      </button>
      <span>count: {count}</span>
      <ShoppingCart />
      {
        error && <div>网站出错:{error}</div>
      }
      {!loading ? (
        <div className={styles.robotList}>
          {robotGallery.map((robot, index) => (
            index % 2 === 0 ?
            <RobotDiscount id={robot.id} email={robot.email} name={robot.name} /> :
            <Robot id={robot.id} email={robot.email} name={robot.name} />
          ))}
        </div>
      ) : (
        <h2>loading 加载中</h2>
      )}
    </div>
  );
};

export default App;
