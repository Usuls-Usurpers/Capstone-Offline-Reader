import React, {Component} from 'react'
import { connect } from 'react-redux'

class URLForm extends Component {
    constructor (props){
        super(props)
        this.state = {
            URL:''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    handleSubmit(event){
        event.preventDefault()
        this.props.addArticleByURL(this.state.URL)
    }
    render() {
        const {URL} =  this.state
        return (
            <div className="add-div" >
                <h3>Save an Article</h3>
                <form className="add-form" onSubmit={this.handleSubmit}>
                    <lable htmlFor="URL">URL</lable>
                    <input name="URL" onChange={this.handleChange} value={URL} />
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    addArticleByURL: (URL) => dispatch(addArticleByURL(URL, history))
})
export default connect(null, mapDispatchToProps)(URLForm)

