import type { NextPage } from 'next'
import {v4} from 'uuid'
import { useState } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {

  interface IanimeList {
    id: string,
    name: string
  }


  const images = [
    {
      imageId: 1,
      image: './attack-on-titan.jpg',
    },
    {
      imageId: 2,
      image: './attack-on-titan2.jpg',
    },
    {
      imageId: 3,
      image: './ania.jpg'
    }
  ]

  const [showImages, setShowImages] = useState(images)
  const [tryed, setTryed] = useState(1)
  const [animeName, setAnimeName] = useState('')
  const [image, setImage] = useState(0)
  const [tryedData, setTryedData] = useState<IanimeList[]>([])

  function tryName (name: string): void {
    if(tryed < 6 && animeName){
      setTryed(tryed + 1)
      setImage(showImages.length - 1)
    }
    if(name){
      setTryedData(newTry(name) || tryedData)
      console.log(tryedData.reverse())
      setAnimeName('') 
    }
  }

  function showImage(imageId: number): void {
    setImage(imageId-1)
  }

  function newTry(name: string): IanimeList[] | null {
    let tryedList = localStorage.getItem("tentativas");
    if(!tryedList){
    if(!name){
      return null;
    }
      let initList = [{
        id: v4(),
        name
      }]
        
      localStorage.setItem("tentativas",JSON.stringify(initList))
      return initList;
    }
    const animeList: IanimeList[] = JSON.parse(localStorage.getItem("tentativas") as string)
    const jaTentou = animeList.some(anime => anime.name === name)
    if(jaTentou){
      return animeList.reverse();
    }
    const newAnime: IanimeList = {
      id: v4(),
      name
    }
    animeList.push(newAnime);
    localStorage.setItem("tentativas",JSON.stringify(animeList))
    return animeList.reverse();
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Anime Frame</title>
        <meta name="description" content="Anime Frame" />
      </Head>

      <main className={styles.main}>
      <h1>Anime Frame</h1>
      <div className={styles.containerImageBullet}>
        <div className={styles.containerWrapperImage}>
          <img src={showImages[image].image} alt='image 1'/>
        </div>
        <div className={styles.containerCodeImage}>
            {
              showImages.map(image => {
                return (
                  <div key={image.imageId} className={styles.codeImage} onClick={()=> {
                    showImage(image.imageId)
                  }}>.</div>
                )
              })
            }
        </div>
      </div>
       <div>
       <input type="text" onChange={e => setAnimeName(e.target.value)} value={animeName}/>
       <button onClick={() => {
         tryName(animeName)
         }
        }>submit</button>
       </div>
      </main>
      <div className={styles.containerTryedAnimes}>
        {
          tryedData.map(anime => {
            return (
              <div className={styles.tryedAnime} key={anime.id}>{anime.name}</div>
            )
          })
        }
       </div>
    </div>
  )
}

export default Home
