import logo from './logo.svg';
import './App.css';
import './Components/Card'
import Card from "./Components/Card";


function App() {

   const data = {

        card: [
            {
                url:"https://onex.am/img/pages/export/export_usa.jpg",
                alt:"Export USA",
                text:"Export from Armenia to USA",
                title:"Armenia to USA"
            },

            {
                url:"https://onex.am/img/pages/export/export_rus.jpg",
                alt:"Export Russia",
                text:"Export from Armenia to Russia",
                title:"Armenia to Russia"
            },

            {
                url:"https://onex.am/images/export-documents.svg",
                alt:"Export USA",
                text:"Delivery of documents from Armenia to anywhere in the world",
                title:"Delivery of documents"
            },

        ]
    }




  return (
    <div className="App">
      <header className="App-header">
      <Card url={data.card[0].url} alt={data.card[0].alt} text={data.card[0].text}  title={data.card[0].title}/>
      <Card url={data.card[1].url} alt={data.card[1].alt} text={data.card[1].text}  title={data.card[1].title}/>
      <Card url={data.card[2].url} alt={data.card[2].alt} text={data.card[2].text}  title={data.card[2].title}/>


      </header>
    </div>
  );
}

export default App;
