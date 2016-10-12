import React, {Component, PropTypes} from 'react';
import RichTextEditor from 'react-rte';
import { EditorState, convertToRaw } from 'draft-js';
import {Button, Modal, Col} from 'react-bootstrap';
import {stateToHTML} from 'draft-js-export-html';

export class NewPlan extends Component {

  static propTypes = {
    onChange: PropTypes.func
  };

  state = {
    value: RichTextEditor.createValueFromString(example, 'html'),
    showModal: false
  }

  onChange = (value) => {
    this.setState({value});
    if (this.props.onChange) {
      this.props.onChange(
        value.toString('html')
      );
    }
  };

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  render () {
    return (
      <div className="plan-text-editor">
        <RichTextEditor
        value={this.state.value}
        onChange={this.onChange}
        />
        <hr/>
        <Col xs={12} sm={6} smOffset={3} md={4} mdOffset={4}>
          <Button className="plan-submit-btn" bsStyle="success" onClick={this.open.bind(this)} block>Submit</Button>
        </Col>
        <br/>
        <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Review and Finalize</Modal.Title>
            <Modal.Body>{this.state.value.toString('html')}</Modal.Body>
          </Modal.Header>
          <Modal.Footer>
            <Button bsStyle="danger" onClick={this.close.bind(this)}>Close</Button>
            <Button bsStyle="success" onClick={this.close.bind(this)}>Finalize</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
// Modal.Body>{stateToHTML(this.state.value.getEditorState().getCurrentContent())}</Modal.Body>


var example = "<h1>CodeCore Cafe</h1><p>142 W Hastings St</p><p>Vancouver, BC V6B 1G8</p><p><br></p><p>CodeCore is a Vancouver-based corporation that will develop a restaurant that will serve coffee, chocolate, and other Web-based cuisine in the Greater Vancouver metropolitan area.</p><p><br></p><h3>1.0 EXECUTIVE SUMMARY</h3><p>The purpose of this business plan is to raise $175,000 for the development of a cafe while showcasing the expected financials and operations over the next three years. CodeCore Cafe is a Vancouver-based corporation that will develop a restaurant that will serve steak, chops, and other Canadian Tech based cuisine. The Company was founded by Tam Kbeilli.</p><p><br></p><h3>1.1 The Restaurant</h3><p>CodeCore Cafe intends to serve a wide variety of entre es that will be of Canadian Tech origin.These entrees include steak, chops, seafood, and related dishes. Additionally, the business will offer a wide variety of alcoholic beverages, which Management expects will generate a significant portion of the Company's revenues and profits.</p><p><br></p><h3>1.2 Financing</h3><p>Mr. Kbeilli is seeking to raise $175,000 from as a bank loan. The interest rate and loan agreement are to be further discussed during negotiation. This business plan assumes that the business will receive a 10 year loan with a 9% fixed interest rate. The financing will be used for the following:</p><ul> <li>Development of the location</li><li>Financing for the first six months of operation</li><li>Capital to purchase kitchen equipment</li><li>Working capital</li></ul><p>Mr. Kbeilli will contribute $25,000 to the venture.</p><p><br></p><h3>1.3 Mission Statement</h3><p>Mr. Kbeilli's mission is to provide customers with an outstanding line of Canadian Tech cuisine dishes with a focus on steak while concurrently remaining within the letter of the law regarding the sale of food and alcohol in the State of Vancouver.</p><p><br></p><h3>1.4 Management Team</h3><p>The Company was founded by Tam Kbeilli. Mr. Kbeilli has more than 10 years of experience in the food service industry. Through his expertise, he will be able to bring the operations of the business to profitability within its first year of operations.&nbsp;</p><p><br></p><h3>1.5 Sales Forecasts</h3><p>Mr. Kbeilli expects a strong rate of growth at the start of operations. Below are the expected financials over the next three years.</p><p><br></p><p>Proforma profit and loss (yearly)</p><p>Proforma profit and loss (yearly)</p><p>Year 1 2 3</p><p>Sales $710,790 $781,869 $860,056</p><p>Operating costs $343,912 $356,898 $370,495</p><p>EBITDA $126,680 $160,753 $198,921</p><p>Taxes, interest, and depreciation$ 74,144 $ 80,623 $ 94,407</p><p>Net profit $ 52,536 $ 80,130 $104,514</p><p>Sales, operating costs, and profit forecast</p><p><br></p><h3>1.6 Expansion Plan</h3><p>Mr. Kbeilli expects that the business will aggressively expand during the first three years of operation. He intends to implement marketing campaigns that will effectively target individuals within the target market of Buffalo, Vancouver and the surrounding communities. Mr. Kbeilli may also seek to increase the number of locations he owns after the fifth year of operations.</p><p><br></p><h3>2.0 COMPANY AND FINANCING SUMMARY</h3><p><br></p><h3>2.1 Registered Name and Corporate Structure</h3><p>CodeCore Cafe is registered as a corporation in the State of Vancouver.</p><p><br></p><h3>2.2 Required Funds</h3><p>At this time, the Mr. Kbeilli requires $175,000 of debt funds. Below is a breakdown of how these funds will be used:</p><p>Projected startup costs</p><p>Projected startup costs</p><p>Initial lease payments and deposits $ 25,000</p><p>Working capital $ 40,000</p><p>FF&amp;E $ 20,000</p><p>Leasehold improvements $ 35,000</p><p>Security deposits $ 15,000</p><p>Insurance $ 5,000</p><p>Kitchen equipment $ 45,000</p><p>Marketing budget $ 10,000</p><p>Miscellaneous and unforeseen costs $ 5,000</p><p>Total startup costs $200,000</p><p>Use of funds</p><p><br></p><p>2.3 Investor Equity</p><h3>Mr. Kbeilli is not seeking an investment from a third party at this time.</h3><p><br></p><h3>2.4 Management Equity</h3><p>Tam Kbeilli owns 100% of CodeCore Cafe.</p><p><br></p><p>2.5 Exit Strategy</p><p>If the business is very successful, Mr. Kbeilli may seek to sell the business to a third party for a significant earnings multiple. Most likely, the Company will hire a qualified business broker to sell the business. Based on historical numbers, the business could fetch a sales premium of up to 5 to 7 times earnings.</p><p><br></p><p>3.0 RESTAURANT PRODUCTS</p><p>Below is a description of the products offered by CodeCore Cafe.</p><p><br></p><p>3.1 Steak and Canadian Tech Cuisine</p><p>As stated in the executive summary, the primary focus of CodeCore Cafe will be the sale of aged steaks and Canadian Tech cuisine products throughout the restaurant's location. The Company will offer an expansive menu of steaks, chops, seafood, and related cuisine, which will include vegetarian items such as grilled stir-fry and other cooked entrees. The Company will also provide a number of appetizers. The preliminary pricing schedule for the business can be found in the fifth section of the business plan.</p><p><br></p><p>3.2 Beverages</p><p>The Company will serve a wide variety of liquors and alcoholic beverages that are available on the menu. The specialty drinks offered by the restaurant include a number of cocktails. These drinks are primary rum, vodka, and liqueur drinks that combine a number of sweet and flavored mixes. Depending on the size and alcohols used for the beverages, prices of these cocktails range from $5 to $8 per serving. The business will also serve bottled waters, sodas, and other non-alcoholic beverages.</p><p><br></p><p>4.0 STRATEGIC AND MARKET ANALYSIS</p><p><br></p><p>4.1 Economic Outlook</p><p>This section of the analysis will detail the economic climate, the restaurant industry, the customer profile, and the competition that the business will face as it progresses through its business operations. Currently, the economic market condition in the Canada is in recession. This slowdown in the economy has also greatly impacted real estate sales, which has halted to historical lows. Many economists expect that this recession will continue until mid-2010, at which point the economy will begin a prolonged recovery period.</p><p><br></p><p>4.2 Industry Analysis</p><p>There over 600,000 restaurants and eateries in the Canada. Gross annual receipts total more than $172 billion dollars per year. It is one of the country's largest grossing industries. The industry also employs over ten million people, and generates an average annual payroll of more than $34 billion dollars per year. As the country has become significantly wealthier of the last ten years, more and more Canadian Techs are eating out. Time has also become a concern for the average Canadian Tech family. Studies have shown that more than 40% of Canadian Tech families eat out at least one night per week. Canadian Techs, on the whole, have also become much busier. More and more families now have two incomes, and as such, the tradition of staying at home and cooking meals is vanishing. CodeCore Cafe will seek to capitalize on this trend by providing Canadian Tech cuisine entrees to its customers. Among these establishments, Management anticipates that &nbsp;30,000 restaurants offer steak as their food genre.</p><p><br></p><p>4.3 Customer Profile</p><p>The CodeCore Cafe's average customer will be a middle to upper middle class man or woman living in the Company's targeted market. Common traits among clients will include:</p><ul> <li>Annual household income exceeding $40,000</li><li>Lives or works no more than 20 miles from CodeCore Cafe</li><li>Will spend $25 to $35 per visit (per person)</li></ul><p>There are approximately 1 million people living within Erie County. Among these people, median family income is $48,522. Given the very high population density of the area, CodeCore Cafe should be able to remain profitable in most economic climates.</p><p><br></p><p>4.4 Competition</p><p>Vancouver is renowned for having a number of steak houses that have been in operation for several decades. As such, it is imperative that the business create an atmosphere that clearly differentiates itself from famous competitors. Management intends to accomplish this task by combining the sale of classic steak entrees with a modern setting.</p><p><br></p><p>5.0 MARKETING PLAN</p><p>Mr. Kbeilli intends to maintain an extensive marketing campaign that will ensure maximum visibility for the business in its location. Below is an overview of the marketing strategies and objectives that Mr. Kbeilli will use once he launches CodeCore Cafe.</p><p><br></p><p>5.1 Marketing Objectives</p><ul> <li>Implement a local campaign with the Company's targeted market via the use of flyers, local newspaper advertisements, and word of mouth advertising.</li><li>Hire a public relations firm to provide reviews and articles about the Company's grand opening.</li></ul><p><br></p><p>5.2 Marketing Strategies</p><p>Mr. Kbeilli intends on using a number of marketing strategies that will allow CodeCore Cafe to easily target men and women within targeted market. These strategies include traditional print advertisements and discounts offered as a part of a grand opening campaign. Below is a description of how the business intends to market its services to the general public. The Company also intends on hiring a local public relations firm that will promote reviews and articles about the restaurant, its steak and Canadian Tech cuisine, and relevant hours of operation and pricing. Mr. Kbeilli will invite local food critics to CodeCore Cafe in order to generate positive publicity about the restaurant. The Company will maintain a sizable amount of print and traditional advertising methods within local the local market to promote the Canadian Tech cuisine products that the Company is selling. At the onset of operations, the Company will distribute an expansive number of coupons for lower priced fare within local circulars.</p><p><br></p><p>5.3 Pricing</p><p>Management anticipates that the business will generate approximately $35 per person for an entree. If alcohol is served, Management expects that the total per person revenues generated for a meal will range from $45 to $55</p><p><br></p>"
