import { Bar } from 'react-chartjs-2'
import { propsBarChart } from '../../../Interface/DashboardInterface'
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const BarChart = ({ dataBarChart, optionsChartLine }: propsBarChart) => (
	<Bar options={optionsChartLine} data={dataBarChart} className="dashboard__charts__chart" />
)

export default BarChart
