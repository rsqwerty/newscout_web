import React from 'react';
import DashboardMenu from '../../components/DashboardMenu';
import DashboardHeader from '../../components/DashboardHeader';
import AllArticlesOpenGraph from '../../components/AllArticlesOpenGraph';
import ArticlesPerAuthorGraph from '../../components/ArticlesPerAuthorGraph';
import ArticlesPerPlatformGraph from '../../components/ArticlesPerPlatformGraph';
import ArticlesPerCategoryGraph from '../../components/ArticlesPerCategoryGraph';
import InteractionsPerCategoryGraph from '../../components/InteractionsPerCategoryGraph';
import InteractionsPerAuthorGraph from '../../components/InteractionsPerAuthorGraph';
import ArticlesPerSessionGraph from '../../components/ArticlesPerSessionGraph';
import InteractionsPerSessionGraph from '../../components/InteractionsPerSessionGraph';
import { ANALYTICS_ALLARTICLESOPEN_URL,	ANALYTICS_ARTICLESPERPLATFORM_URL,
		 ANALYTICS_ARTICLESPERCATEGORY_URL,
		 ANALYTICS_INTERACTIONSPERCATEGORY_URL,
		 ANALYTICS_ARTICLESPERAUTHOR_URL,
		 ANALYTICS_INTERACTIONSPERAUTHOR_URL,
		 ANALYTICS_ARTICLESPERSESSION_URL,
		 ANALYTICS_INTERACTIONSPERSESSION_URL } from '../../utils/Constants';
import { getRequest } from '../../utils/Utils';
import Datetime from 'react-datetime';
import { Button, FormGroup, Label, Input } from 'reactstrap';


class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			AllArticlesOpenData: [],
			AllArticlesOpenNoData: false,
			AllArticlesOpenLoading: true,
			ArticlesPerPlatformData: [],
			ArticlesPerPlatformNoData: false,
			ArticlesPerPlatformLoading: false,
			ArticlesPerCategoryData: [],
			ArticlesPerCategoryNoData: false,
			ArticlesPerCategoryLoading: true,
			InteractionsPerCategoryData: [],
			InteractionsPerCategoryNoData: false,
			InteractionsPerCategoryLoading: true,
			ArticlesPerAuthorData: [],
			ArticlesPerAuthorNoData: false,
			ArticlesPerAuthorLoading: true,
			InteractionsPerAuthorData: [],
			InteractionsPerAuthorNoData: false,
			InteractionsPerAuthorLoading: true,
			ArticlesPerSessionData: [],
			ArticlesPerSessionNoData: false,
			ArticlesPerSessionLoading: true,
			InteractionsPerSessionData: [],
			InteractionsPerSessionNoData: false,
			InteractionsPerSessionLoading: true,
			dropdownOpen: false,
			custom: false,
			selectedValue: "",
			disabled: true,
			start_date: "",
			end_date: "",
			date_err: "",
			AllArticlesOpenAvgCount: 0,
			ArticlesPerPlatformAvgCount: 0,
			ArticlesPerCategoryAvgCount: 0,
			InteractionsPerCategoryAvgCount: 0,
			ArticlesPerAuthorAvgCount: 0,
			InteractionsPerAuthorAvgCount: 0,
			ArticlesPerSessionAvgCount: 0,
			InteractionsPerSessionAvgCount: 0
		};
	}

	SetResponseData = (data, extraData) => {
		if (extraData.loading == "AllArticlesOpenLoading"){
			var key = "AllArticlesOpenLoading";
			var DataKey = "AllArticlesOpenData";
			var NoDataKey = "AllArticlesOpenNoData";
			var AvgCountKey = "AllArticlesOpenAvgCount";
		} else if (extraData.loading == "ArticlesPerPlatformLoading"){
			var key = "ArticlesPerPlatformLoading";
			var DataKey = "ArticlesPerPlatformData";
			var NoDataKey = "ArticlesPerPlatformNoData";
			var AvgCountKey = "ArticlesPerPlatformAvgCount";
		} else if (extraData.loading == "ArticlesPerCategoryLoading"){
			var key = "ArticlesPerCategoryLoading";
			var DataKey = "ArticlesPerCategoryData";
			var NoDataKey = "ArticlesPerCategoryNoData";
			var AvgCountKey = "ArticlesPerCategoryAvgCount";
		} else if (extraData.loading == "InteractionsPerCategoryLoading"){
			var key = "InteractionsPerCategoryLoading";
			var DataKey = "InteractionsPerCategoryData";
			var NoDataKey = "InteractionsPerCategoryNoData";
			var AvgCountKey = "InteractionsPerCategoryAvgCount";
		} else if (extraData.loading == "ArticlesPerAuthorLoading"){
			var key = "ArticlesPerAuthorLoading";
			var DataKey = "ArticlesPerAuthorData";
			var NoDataKey = "ArticlesPerAuthorNoData";
			var AvgCountKey = "ArticlesPerAuthorAvgCount";
		} else if (extraData.loading == "InteractionsPerAuthorLoading"){
			var key = "InteractionsPerAuthorLoading";
			var DataKey = "InteractionsPerAuthorData";
			var NoDataKey = "InteractionsPerAuthorNoData";
			var AvgCountKey = "InteractionsPerAuthorAvgCount";
		} else if (extraData.loading == "ArticlesPerSessionLoading"){
			var key = "ArticlesPerSessionLoading";
			var DataKey = "ArticlesPerSessionData";
			var NoDataKey = "ArticlesPerSessionNoData";
			var AvgCountKey = "ArticlesPerSessionAvgCount";
		} else if (extraData.loading == "InteractionsPerSessionLoading"){
			var key = "InteractionsPerSessionLoading";
			var DataKey = "InteractionsPerSessionData";
			var NoDataKey = "InteractionsPerSessionNoData";
			var AvgCountKey = "InteractionsPerSessionAvgCount";
		}
		var state = this.state;
		state[key] = false
		state[DataKey] = data.body.result
		state[NoDataKey] = data.body.no_data
		state[AvgCountKey] = data.body.avg_count
		this.setState(state);
	}

	GetAllArticlesOpenData = (url) => {
		var URL = url || ANALYTICS_ALLARTICLESOPEN_URL;
		var extraData = {"loading": "AllArticlesOpenLoading"}
		getRequest(URL, this.SetResponseData, false, extraData);
	}

	GetArticlesPerPlatformData = (url) => {
		var URL = url || ANALYTICS_ARTICLESPERPLATFORM_URL;
		var extraData = {"loading": "ArticlesPerPlatformLoading"}
		getRequest(URL, this.SetResponseData, false, extraData);
	}

	GetArticlesPerCategoryData = (url) => {
		var URL = url || ANALYTICS_ARTICLESPERCATEGORY_URL;
		var extraData = {"loading": "ArticlesPerCategoryLoading"}
		getRequest(URL, this.SetResponseData, false, extraData);
	}

	GetInteractionsPerCategoryData = (url) => {
		var URL = url || ANALYTICS_INTERACTIONSPERCATEGORY_URL;
		var extraData = {"loading": "InteractionsPerCategoryLoading"}
		getRequest(URL, this.SetResponseData, false, extraData);
	}

	GetArticlesPerAuthorData = (url) => {
		var URL = url || ANALYTICS_ARTICLESPERAUTHOR_URL;
		var extraData = {"loading": "ArticlesPerAuthorLoading"}
		getRequest(URL, this.SetResponseData, false, extraData);
	}

	GetInteractionsPerAuthorData = (url) => {
		var URL = url || ANALYTICS_INTERACTIONSPERAUTHOR_URL;
		var extraData = {"loading": "InteractionsPerAuthorLoading"}
		getRequest(URL, this.SetResponseData, false, extraData);
	}

	GetArticlesPerSessionData = (url) => {
		var URL = url || ANALYTICS_ARTICLESPERSESSION_URL;
		var extraData = {"loading": "ArticlesPerSessionLoading"}
		getRequest(URL, this.SetResponseData, false, extraData);
	}

	GetInteractionsPerSessionData = (url) => {
		var URL = url || ANALYTICS_INTERACTIONSPERSESSION_URL;
		var extraData = {"loading": "InteractionsPerSessionLoading"}
		getRequest(URL, this.SetResponseData, false, extraData);
	}

	toggle = () => {
		this.setState({
			dropdownOpen: !this.state.dropdownOpen
		})
	}

	onChangeSelect = (e) => {
		var selectedValue = e.target.value;
		var state = this.state;
		state.selectedValue = selectedValue;
		state.disabled = false;
		if(selectedValue == "custom"){
			state.custom = true
		} else {
			state.custom = false
		}
		this.setState(state);
	}

	handleSubmitBtn = () => {
		var state = this.state;
		state.disabled = true;
		state.AllArticlesOpenLoading = true;
		state.ArticlesPerPlatformLoading = true;
		state.ArticlesPerCategoryLoading = true;
		state.InteractionsPerCategoryLoading = true;
		state.ArticlesPerAuthorLoading = true;
		state.InteractionsPerAuthorLoading = true;
		state.ArticlesPerSessionLoading = true;
		state.InteractionsPerSessionLoading = true;
		this.setState(state);
		if (state.selectedValue === "custom"){
			var start_date = this.state.start_date.format('MM/DD/YYYY HH:mm:ss');
			var end_date = this.state.end_date.format('MM/DD/YYYY HH:mm:ss');
			var date_range = "?date_range=" + start_date + "-" + end_date;
		} else {
			var date_range = "?date_range=" + state.selectedValue;
		}

		var FILTER_ANALYTICS_ALLARTICLESOPEN_URL = ANALYTICS_ALLARTICLESOPEN_URL + date_range;
		var FILTER_ANALYTICS_ARTICLESPERPLATFORM_URL = ANALYTICS_ARTICLESPERPLATFORM_URL + date_range;
		var FILTER_ANALYTICS_ARTICLESPERCATEGORY_URL = ANALYTICS_ARTICLESPERCATEGORY_URL + date_range;
		var FILTER_ANALYTICS_INTERACTIONSPERCATEGORY_URL = ANALYTICS_INTERACTIONSPERCATEGORY_URL + date_range;
		var FILTER_ANALYTICS_ARTICLESPERAUTHOR_URL = ANALYTICS_ARTICLESPERAUTHOR_URL + date_range;
		var FILTER_ANALYTICS_INTERACTIONSPERAUTHOR_URL = ANALYTICS_INTERACTIONSPERAUTHOR_URL + date_range;
		var FILTER_ANALYTICS_ARTICLESPERSESSION_URL = ANALYTICS_ARTICLESPERSESSION_URL + date_range;
		var FILTER_ANALYTICS_INTERACTIONSPERSESSION_URL = ANALYTICS_INTERACTIONSPERSESSION_URL + date_range;
		this.GetAllArticlesOpenData(FILTER_ANALYTICS_ALLARTICLESOPEN_URL);
		this.GetArticlesPerPlatformData(FILTER_ANALYTICS_ARTICLESPERPLATFORM_URL);
		this.GetArticlesPerCategoryData(FILTER_ANALYTICS_ARTICLESPERCATEGORY_URL);
		this.GetInteractionsPerCategoryData(FILTER_ANALYTICS_INTERACTIONSPERCATEGORY_URL);
		this.GetArticlesPerAuthorData(FILTER_ANALYTICS_ARTICLESPERAUTHOR_URL);
		this.GetInteractionsPerAuthorData(FILTER_ANALYTICS_INTERACTIONSPERAUTHOR_URL);
		this.GetArticlesPerSessionData(FILTER_ANALYTICS_ARTICLESPERSESSION_URL);
		this.GetInteractionsPerSessionData(FILTER_ANALYTICS_INTERACTIONSPERSESSION_URL);
	}

	isValidDate = (current) => {
		var d = new Date();
		if (current > d){
			return false;
		} return true;
	}

	onDateChange = (selected_date, date_str) => {
		var state = this.state;
		if (date_str === "start_date"){
			state.start_date = selected_date
		} else {
			state.end_date = selected_date
		}
		if(state.start_date && state.end_date && state.start_date > state.end_date){
			state.date_err = "Invalid date selection"
			state.disabled = true
		} else if (state.start_date && state.end_date && state.end_date > new Date()){
			state.date_err = "Invalid date selection"
			state.disabled = true
		} else {
			state.date_err = ""
			state.disabled = false
		}
		this.setState(state)
	}

	componentDidMount(){
		this.GetAllArticlesOpenData()
		this.GetArticlesPerPlatformData()
		this.GetArticlesPerCategoryData()
		this.GetInteractionsPerCategoryData()
		this.GetArticlesPerAuthorData()
		this.GetInteractionsPerAuthorData()
		this.GetArticlesPerSessionData()
		this.GetInteractionsPerSessionData()
	}

	render(){
		return(
			<div className="App">
				<DashboardHeader />
				<div className="container-fluid">
					<div className="row">
						<DashboardMenu />
						<main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
							<div className="row">
								<div className="col-md-4">
									<FormGroup>
										<Label for="date_range">Select Date Range</Label>
										<Input type="select" name="date_range" id="date_range" onChange={(e) => this.onChangeSelect(e)}>
											<option value="today">Today</option>
											<option value="yesterday">Yesterday</option>
											<option value="7days" selected>Last 7 Days</option>
											<option value="30days">Last 30 Days</option>
											<option value="last_month">Last Month</option>
											<option value="custom">Custom</option>
										</Input>
									</FormGroup>
								</div>
								{this.state.custom ?
									<div className="col-md-4">
										<FormGroup>
											<Label for="" className="d-block">Start Date</Label>
											<Datetime value={this.state.start_date} isValidDate={this.isValidDate} onChange={(e) => this.onDateChange(e, "start_date")} />
										</FormGroup>
										<FormGroup>
											<Label for="" className="d-block">End Date</Label>
											<Datetime value={this.state.end_date} isValidDate={this.isValidDate} onChange={(e) => this.onDateChange(e, "end_date")} />
											<p className="text-danger">{this.state.date_err}</p>
										</FormGroup>
									</div>
								:
									""
								}
								<div className="col-md-4">
									<Label for="" className="d-block text-transparent">Select Date Range</Label>
									<Button color="primary" onClick={this.handleSubmitBtn} disabled={this.state.disabled}>Submit</Button>
								</div>
							</div>
							<div className="row mt-5 mb-3">
								<div className="col-lg-3">
									<div className="card skewed-bg">
										<div className="clearfix">
											<div className="float-left">
												<h3 className="text-center mb-0">{this.state.AllArticlesOpenAvgCount}</h3>
											</div>
											<div className="float-right">
												<div className="card-body">
													<div className="text-center">
														<p className="mb-0">Average Articles</p>
														<h5 className="mb-0 mt-2">Open</h5>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="col-lg-3">
									<div className="card skewed-bg">
										<div className="clearfix">
											<div className="float-left">
												<h3 className="text-center mb-0">{this.state.ArticlesPerPlatformAvgCount}</h3>
											</div>
											<div className="float-right">
												<div className="card-body">
													<div className="text-center">
														<p className="mb-0">Average Articles Per</p>
														<h5 className="mb-0 mt-2">Platform</h5>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="col-lg-3">
									<div className="card skewed-bg">
										<div className="clearfix">
											<div className="float-left">
												<h3 className="text-center mb-0">{this.state.ArticlesPerCategoryAvgCount}</h3>
											</div>
											<div className="float-right">
												<div className="card-body">
													<div className="text-center">
														<p className="mb-0">Average Articles Per</p>
														<h5 className="mb-0 mt-2">Category</h5>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="col-lg-3">
									<div className="card skewed-bg">
										<div className="clearfix">
											<div className="float-left">
												<h3 className="text-center mb-0">{this.state.InteractionsPerCategoryAvgCount}</h3>
											</div>
											<div className="float-right">
												<div className="card-body">
													<div className="text-center">
														<p className="mb-0">Average Interactions Per</p>
														<h5 className="mb-0 mt-2">Category</h5>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="row mb-5">
								<div className="col-lg-3">
									<div className="card skewed-bg">
										<div className="clearfix">
											<div className="float-left">
												<h3 className="text-center mb-0">{this.state.ArticlesPerAuthorAvgCount}</h3>
											</div>
											<div className="float-right">
												<div className="card-body">
													<div className="text-center">
														<p className="mb-0">Average Articles Per</p>
														<h5 className="mb-0 mt-2">Author</h5>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="col-lg-3">
									<div className="card skewed-bg">
										<div className="clearfix">
											<div className="float-left">
												<h3 className="text-center mb-0">{this.state.InteractionsPerAuthorAvgCount}</h3>
											</div>
											<div className="float-right">
												<div className="card-body">
													<div className="text-center">
														<p className="mb-0">Average Interactions Per</p>
														<h5 className="mb-0 mt-2">Author</h5>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="col-lg-3">
									<div className="card skewed-bg">
										<div className="clearfix">
											<div className="float-left">
												<h3 className="text-center mb-0">{this.state.ArticlesPerSessionAvgCount}</h3>
											</div>
											<div className="float-right">
												<div className="card-body">
													<div className="text-center">
														<p className="mb-0">Average Articles Per</p>
														<h5 className="mb-0 mt-2">Session</h5>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="col-lg-3">
									<div className="card skewed-bg">
										<div className="clearfix">
											<div className="float-left">
												<h3 className="text-center mb-0">{this.state.InteractionsPerSessionAvgCount}</h3>
											</div>
											<div className="float-right">
												<div className="card-body">
													<div className="text-center">
														<p className="mb-0">Average Interactions Per</p>
														<h5 className="mb-0 mt-2">Session</h5>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="row">
								<div className="graph-section">
									<AllArticlesOpenGraph data={this.state.AllArticlesOpenData} loading={this.state.AllArticlesOpenLoading} no_data={this.state.AllArticlesOpenNoData}/>
								</div>
							</div>
							<div className="row">
								<div className="graph-section">
									<ArticlesPerPlatformGraph data={this.state.ArticlesPerPlatformData} loading={this.state.ArticlesPerPlatformLoading} no_data={this.state.ArticlesPerPlatformNoData} />
								</div>
							</div>
							<div className="row">
								<div className="graph-section">
									<ArticlesPerCategoryGraph data={this.state.ArticlesPerCategoryData} loading={this.state.ArticlesPerCategoryLoading} no_data={this.state.ArticlesPerCategoryNoData} />
								</div>
							</div>
							<div className="row">
								<div className="graph-section">
									<InteractionsPerCategoryGraph data={this.state.InteractionsPerCategoryData} loading={this.state.InteractionsPerCategoryLoading} no_data={this.state.InteractionsPerCategoryNoData} />
								</div>
							</div>
							<div className="row">
								<div className="graph-section">
									<ArticlesPerAuthorGraph data={this.state.ArticlesPerAuthorData} loading={this.state.ArticlesPerAuthorLoading} no_data={this.state.ArticlesPerAuthorNoData} />
								</div>
							</div>
							<div className="row">
								<div className="graph-section">
									<InteractionsPerAuthorGraph data={this.state.InteractionsPerAuthorData} loading={this.state.InteractionsPerAuthorLoading} no_data={this.state.InteractionsPerAuthorNoData} />
								</div>
							</div>
							<div className="row">
								<div className="graph-section">
									<ArticlesPerSessionGraph data={this.state.ArticlesPerSessionData} loading={this.state.ArticlesPerSessionLoading} no_data={this.state.ArticlesPerSessionNoData} />
								</div>
							</div>
							<div className="row">
								<div className="graph-section">
									<InteractionsPerSessionGraph data={this.state.InteractionsPerSessionData} loading={this.state.InteractionsPerSessionLoading} no_data={this.state.InteractionsPerSessionNoData} />
								</div>
							</div>
						</main>
					</div>
				</div>
			</div>
		);
	}
}

export default App;