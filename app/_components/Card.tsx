import Image from "next/image";

type CardProps = {
  image: string;
  text: string;
  subtext: string;
}

export default function Card({image, text, subtext}: CardProps) {
  return (
    <>
      <div className="card card-side shadow-xl w-full p-5 bg-base-300">
        <figure><Image width={100} height={100} src={image} alt="Movie"/></figure>
        <div className="card-body">
          <h2 className="card-title">{text}</h2>
          <p>{subtext}</p>
        </div>
      </div>
    </>
  )
}