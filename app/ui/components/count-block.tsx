export default function CountBlock(props: {count: number, text: string}) {
  return <div className={'border p-10 flex flex-col justify-center items-center bg-background rounded-md aspect-square w-44 hover:shadow-bloom transition-shadow'}>
    <h1 className={'font-bold text-5xl'}>{props.count}</h1>
    <p>{props.text}</p>
  </div>
}
