import React from 'react'
import { Bar } from 'react-chartjs-2'
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
	ChartData,
	CoreChartOptions,
} from 'chart.js'
import { _DeepPartialObject } from 'chart.js/types/utils'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface propsBarChart {
	dataBarChart: any
	optionsChartLine: any
}

const BarChart = ({ dataBarChart, optionsChartLine }: propsBarChart) => (
	<Bar options={optionsChartLine} data={dataBarChart} className="dashboard__charts__chart" />
)

export default BarChart
