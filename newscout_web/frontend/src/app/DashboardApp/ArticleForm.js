import React from 'react';
import moment from 'moment';
import ReactDOM from 'react-dom';
import Select from 'react-select';
import Datetime from 'react-datetime';
import { ToastContainer } from 'react-toastify';
import * as serviceWorker from './serviceWorker';
import {ARTICLE_SOURCE_LIST_URL, ARTICLE_CATEGORY_LIST_URL,
    ARTICLE_CREATE_URL, ARTICLE_DETAIL_URL} from '../../utils/Constants';
import DashboardMenu from '../../components/DashboardMenu';
import DashboardHeader from '../../components/DashboardHeader';
import { getRequest, postRequest, putRequest } from '../../utils/Utils';
import { Button, Form, FormGroup, Label, FormText, Row, Col } from 'reactstrap';
import Summernote from '../../components/Summernote';

import './index.css';

class ArticleForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			modal: false,
			fields: {
                title: "",
                source: "",
                category: "",
                published_on: "",
                blurb: ""
            },
            sources: [],
            categories: [],
			errors: {},
			rows: {},
			formSuccess: false,
            results: [],
            active_page: ACTIVE_PAGE,
            article_id: ARTICLE_ID
		};
    }

    handleChange = (value_type, e) => {
        var label = e.label
        var value = e.value;
        var state = this.state
        if (value_type == "article_source") {
            state.fields.source = {value: value, label: label}
        }

        if (value_type == "article_category") {
            state.fields.category = {value: value, label: label}
        }
        this.setState(state)
    }

    onChange = (field, e) => {
		let fields = this.state.fields;
		if(field === "published_on"){
			fields[field] = e;
		} else {
			fields[field] = e.target.value;
		}

		this.setState({fields});
    }

    onSummernoteChange = (content) => {
        let fields = this.state.fields;
        fields.blurb = content;
        this.setState(fields);
    }

    setSources = (data) => {
        var sources = [];
        data.body.results.map((el, index) => {
            var option = {label: el.name, value: el.id}
            sources.push(option)
        })
        this.setState({
            "sources": sources
        })
    }

    getArticleDetails = () => {
        var url = ARTICLE_DETAIL_URL + this.state.article_id + "/";
		getRequest(url, this.setArticleDetails);
    }

    setArticleDetails = (data) => {
        var state = this.state;
        var article_detail = data.body.article;
        state.fields.title = article_detail.title;
        state.fields.category = {label: article_detail.category, value: article_detail.category_id};
        state.fields.source = {label: article_detail.source, value: article_detail.source_id};
        state.fields.blurb = article_detail.blurb;
        state.fields.published_on = moment(article_detail.published_on).format('YYYY-MM-DD m:ss A');
        this.setState(state);
    }

    getSources = () => {
        var url = ARTICLE_SOURCE_LIST_URL;
		getRequest(url, this.setSources);
    }

    setCategories = (data) => {
        var categories = [];
        data.body.categories.map((el, index) => {
            var option = {label: el.name, value: el.id}
            categories.push(option)
        })
        this.setState({
            "categories": categories
        })
    }

    getCategories = () => {
        var url = ARTICLE_CATEGORY_LIST_URL;
		getRequest(url, this.setCategories);
    }

    articleSave = (method) => {
        var fields = this.state.fields;
        fields.category = fields.category.value
        fields.source_url = "http://" + fields.source.label
        fields.cover_image = fields.source_url
        fields.source = fields.source.value
        if (method == "post"){
            var body = JSON.stringify(fields)
            postRequest(ARTICLE_CREATE_URL, body, this.articleSubmitResponse, "POST");
        } else {
            fields.published_on = moment(fields.published_on, "YYYY-MM-DD HH:mm Z")
            fields.id = this.state.article_id
            var body = JSON.stringify(fields)
            putRequest(ARTICLE_CREATE_URL, body, this.articleSubmitResponse, "PUT");
        }
    }

    articlePublish = (method) =>{
        var fields = this.state.fields;
        fields.category = fields.category.value
        fields.source_url = "http://" + fields.source.label
        fields.cover_image = fields.source_url
        fields.source = fields.source.value
        fields.is_publish = true;
        if (method == "post"){
            fields.publish = true
            var body = JSON.stringify(fields)
            postRequest(ARTICLE_CREATE_URL, body, this.articleSubmitResponse, "POST");
        } else {
            fields.publish = true
            fields.published_on = moment(fields.published_on, "YYYY-MM-DD HH:mm Z")
            fields.id = this.state.article_id
            var body = JSON.stringify(fields)
            putRequest(ARTICLE_CREATE_URL, body, this.articleSubmitResponse, "PUT");
        }
    }

    articleSubmitResponse = (data) => {
        this.setState({'formSuccess': true});
		setTimeout(() => {
			this.setState({
                "formSuccess": false,
                "fields": {
                    "title": "",
                    "source": "",
                    "category": "",
                    "published_on": "",
                    "blurb": ""
                }
            });
        }, 3000);
    }

    componentDidMount() {
        if (this.state.article_id) {
            this.getArticleDetails()
        }
        this.getSources()
        this.getCategories()
    }

	render(){
        if (this.state.active_page == "article-create"){
            var page_title = "Article Create"
            var method = "post"
        } else {
            var page_title = "Article Edit"
            var method = "put"
        }
		return(
			<React.Fragment>
				<ToastContainer />
				<div className="campaign">
					<DashboardHeader />
                    <div className="container-fluid">
						<div className="row">
							<DashboardMenu />
							<main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
								<div className="mb-3">
									<h1 className="h2">{page_title}</h1>
                                    <Form>
                                        <Row form>
                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label for="name">Article Title</Label>
                                                    <input refs="name" type="textarea" name="name" className="form-control" placeholder="Article Title" id="title" value={this.state.fields.title} onChange={(e) => this.onChange("title", e)} />
                                                    <FormText color="danger">{this.state.errors["name"]}</FormText>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row form>
                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label for="article_source">Article Source</Label>
                                                    <Select refs="source" options={this.state.sources} value={this.state.fields.source} onChange={(e) => this.handleChange("article_source", e)} />
                                                    <FormText color="danger">{this.state.errors["article_source"]}</FormText>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row form>
                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label for="article_category">Article Category</Label>
                                                    <Select refs="category" value={this.state.fields.category}  options={this.state.categories} onChange={(e) => this.handleChange("article_category", e)} />
                                                    <FormText color="danger">{this.state.errors["article_category"]}</FormText>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row form>
                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label for="published_on">Published On</Label>
                                                    <Datetime refs="published_on" value={this.state.fields.published_on}  dateFormat="YYYY-MM-DD" timeFormat={true} placeholder="YYYY-MM-DD" id="published_on" onChange={(e) => this.onChange("published_on", e)} />
                                                    <FormText color="danger">{this.state.errors["published_on"]}</FormText>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row form>
                                            <Col md={10}>
                                                <FormGroup>
                                                    <Summernote
                                                        changedValue={this.onSummernoteChange}
                                                        value={this.state.fields.blurb}
                                                        isletter={true}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={3}>
                                                <Button color="success" onClick={(e) => this.articleSave(method)} type="button">Save</Button>&nbsp;&nbsp;
                                                <Button color="success" onClick={(e) => this.articlePublish(method)} type="button">Save & Publish</Button>&nbsp;&nbsp;
                                                <Button color="secondary" onClick={this.redirecttoArticleList} type="button">Cancel</Button>
                                            </Col>
                                            <Col md={6}>
                                                {this.state.formSuccess ?
                                                    <h6 className="text-success mt-2">Article submitted successfully.</h6>
                                                : ""}
                                            </Col>
                                        </Row>
                                    </Form>
                                </div>
                            </main>
                        </div>
                    </div>
				</div>
			</React.Fragment>
		);
	}
}

export default ArticleForm;

ReactDOM.render(<ArticleForm />, document.getElementById('root'));
serviceWorker.unregister();