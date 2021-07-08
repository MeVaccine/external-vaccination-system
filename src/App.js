import React, { useState } from 'react'
import { Button, Form } from 'semantic-ui-react'
import axios from 'axios'
import './App.css'

function App() {
	const [userId, setUserId] = useState('')
	const [date, setDate] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const onSubmit = async event => {
		event.preventDefault()
		setIsLoading(true)
		try {
			await axios.post('http://localhost:8080/external/vaccinated', {
				id: userId,
				dateTime: date,
			})
		} catch (error) {
			console.log(error.data)
		}
		setIsLoading(false)
	}

	return (
		<div className="App">
			<h1>MeVaccine Mock Vaccination System</h1>
			<Form onSubmit={onSubmit}>
				<Form.Field>
					<label>National ID</label>
					<input type="text" value={userId} onChange={e => setUserId(e.target.value)} />
				</Form.Field>
				<Form.Field>
					<label>Date</label>
					<input type="date" value={date} onChange={e => setDate(e.target.value)} />
				</Form.Field>
				<Button loading={isLoading} type="submit">
					Submit
				</Button>
			</Form>
		</div>
	)
}

export default App
