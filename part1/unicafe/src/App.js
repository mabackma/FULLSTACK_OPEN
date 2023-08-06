import { useState } from 'react'

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  const total = () => {
    return props.feedback.good + props.feedback.neutral + props.feedback.bad
  }
  const average = () => {
    return (props.feedback.good - props.feedback.bad) / total()
  }
  const positive = () => {
    return 100 * ((props.feedback.good) / total()) + " %"
  }
  
  if (props.feedback.good === 0 && props.feedback.neutral === 0 && props.feedback.bad === 0) {
    return(
      <div>
        No feedback given
      </div>
    )
  }
  else {
    return(
      <table>
        <StatisticLine text="good" value={props.feedback.good} />
        <StatisticLine text="neutral" value={props.feedback.neutral} />
        <StatisticLine text="bad" value={props.feedback.bad} />
        <StatisticLine text="all" value={total()} />
        <StatisticLine text="average" value={average()} />
        <StatisticLine text="positive" value={positive()} />
      </table>
    )
  }
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => {
    setGood(good + 1)
  }
  const increaseNeutral = () => {
    setNeutral(neutral + 1)
  }
  const increaseBad = () => {
    setBad(bad + 1)
  }

  const feedback = {
    good: good,
    neutral: neutral,
    bad: bad
  }

  return (
    <div>
      <h1>
        give feedback
      </h1>
      <Button handleClick={increaseGood} text={"good"}/>
      <Button handleClick={increaseNeutral} text={"neutral"}/>
      <Button handleClick={increaseBad} text={"bad"}/>
      <h1>
        statistics
      </h1>
      <Statistics feedback={feedback}/>
    </div>
  )
}

export default App
