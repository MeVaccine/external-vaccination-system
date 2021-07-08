import React, { useState } from 'react'
import { Button, Form, Message } from 'semantic-ui-react'
import axios from 'axios'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import './App.css'

dayjs.extend(utc)
dayjs.extend(LocalizedFormat)

function App() {
	const [userId, setUserId] = useState('')
	const [date, setDate] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [isSuccess, setIsSuccess] = useState(false)
	const [isError, setIsError] = useState(false)
	const [message, setMessage] = useState('')

	const onSubmit = async event => {
		event.preventDefault()
		setIsSuccess(false)
		setIsError(false)
		setIsLoading(true)
		try {
			const res = await axios.post('https://mevaccine.cscms.me/external/vaccinated', {
				id: userId,
				dateTime: date,
			})
			setMessage(
				res.data.dateTime
					? `Next appointment is on ${dayjs.utc(res.data.dateTime).local().format('lll')}`
					: `Success on second dose`
			)
			setIsSuccess(true)
		} catch (error) {
			console.log(error.response.data)
			setMessage(error.response.data.message)
			setIsError(true)
		}
		setIsLoading(false)
	}

	return (
		<div className="App">
			<h1>MeVaccine Mock Vaccination System</h1>
			<Form onSubmit={onSubmit} success={isSuccess} error={isError}>
				<Form.Field>
					<label>National ID</label>
					<input type="text" value={userId} onChange={e => setUserId(e.target.value)} />
				</Form.Field>
				<Form.Field>
					<label>Date</label>
					<input type="date" value={date} onChange={e => setDate(e.target.value)} />
				</Form.Field>
				<Message success header="Success" content={message} />
				<Message error header="Error" content={message} />
				<Button loading={isLoading} type="submit">
					Submit
				</Button>
			</Form>
		</div>
	)
}

export default App
