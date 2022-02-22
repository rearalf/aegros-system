import React from 'react'
import ArticleDataCounts from './ArticleDataCounts'

const DataCounts = ({
	totalAppointments,
	totalPatients,
	todayAppointments,
	totalAppointmentsCancel,
	totalAppointmentsFinish,
	loadingDataCount,
}) => {
	return (
		<section className="dashboard__data__counts">
			<ArticleDataCounts
				loadingDataCount={loadingDataCount}
				title="Total de pacientes"
				total={totalPatients}
				className="total__patients__icon"
				type={'user'}
			/>
			<ArticleDataCounts
				loadingDataCount={loadingDataCount}
				title="Total de citas"
				total={totalAppointments}
				className="total__appointments__icon"
				type={'appointment'}
			/>
			<ArticleDataCounts
				loadingDataCount={loadingDataCount}
				title="Citas para hoy"
				total={todayAppointments}
				className="today__appointments__icon"
				type={'appointment'}
			/>
			<ArticleDataCounts
				loadingDataCount={loadingDataCount}
				title="Citas canceladas"
				total={totalAppointmentsCancel}
				className="total__appointments__cancel__icon"
				type={'appointment'}
			/>
			<ArticleDataCounts
				loadingDataCount={loadingDataCount}
				title="Citas finalizadas"
				total={totalAppointmentsFinish}
				className="total__appointments__finish__icon"
				type={'appointment'}
			/>
		</section>
	)
}

export default DataCounts
