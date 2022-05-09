import React from 'react'
import systemLogo from "../../../../content/systemLogo.png";
import miletapLogo from "../../../../content/miletapLogo.png";
import detFeature1 from "../../../../content/svg/features/dtfeature1.png";
import detFeature2 from "../../../../content/svg/features/dtfeature2.png";
import detFeature3 from "../../../../content/svg/features/dtfeature3.png";

function AuthFoooterContent() {
    return (
        <div className="lg-ab-area" id="down">
            <div className="m-msg" style={{marginTop: "50px"}}>
                Making a company feel more connected,<br/>
                improving productivity and communication
                and making work fun
            </div>
            <div className="lg-ft-icons">
                <div className="ft-icon"><i className="ic-feature1"/></div>
                <div className="ft-icon"><i className="ic-feature2"/></div>
                <div className="ft-icon"><i className="ic-feature3"/></div>
                <div className="ft-icon"><i className="ic-feature4"/></div>
                <div className="ft-icon"><i className="ic-feature5"/></div>
                <div className="ft-icon"><i className="ic-feature6"/></div>
                <div className="ft-icon"><i className="ic-feature7"/></div>
                <div className="ft-icon"><i className="ic-feature8"/></div>
            </div>
            <div className="s-msg">
                See the efficiencies you can can bring to your<br/>
                your organisation with our application’s features
            </div>
            <div className="n-msg">
                A solution truly customised to the requirement of an organisation, catering to their internal
                customer needs,<br/> covering aspects of organisational communication, one to one conversation,
                emails, leave management, task management,<br/> scheduling and a lot more subject
                to the requirements of every individual organization.
            </div>
            <div className="lg-key-features">
                <div className="key-feature">
                    <div className="key-feature-top">
                        <div className="key-feature-icon"><i className="ic-key-feature1"/></div>
                        <div className="key-feature-name">
                            Flexible Projects
                        </div>
                    </div>
                    <div className="key-feature-det">
                        A solution that lets you know the full trail of a projects like a case. Managing the
                        history of the every project knowing minute by minute detail having a trail of
                        conversations, meetings, documents and which individual was assigned which task. A
                        solution that lets you keep track of everything.
                    </div>
                </div>
                <div className="key-feature">
                    <div className="key-feature-top">
                        <div className="key-feature-icon"><i className="ic-key-feature2"/></div>
                        <div className="key-feature-name">
                            Expense & Travel
                        </div>
                    </div>
                    <div className="key-feature-det">
                        In today's world its easy to get an income but to review expenses and manage operational
                        overheads is a key challenge. A customised solution to look into your expense and travel
                        requirements with approval work flow management.
                    </div>
                </div>
                <div className="key-feature">
                    <div className="key-feature-top">
                        <div className="key-feature-icon"><i className="ic-key-feature3"/></div>
                        <div className="key-feature-name">
                            Schedules
                        </div>
                    </div>
                    <div className="key-feature-det">
                        An organisations productivity is directly related to every staff members productivity
                        which is effected by effective scheduling and the ability to keep track against tasks
                        associated to those meetings.<br/><br/>
                        From scheduling our meetings to our tasks to picking up a colleague everything needs to
                        be reminded like a personal assistant.
                    </div>
                </div>
                <div className="key-feature">
                    <div className="key-feature-top">
                        <div className="key-feature-icon"><i className="ic-key-feature4"/></div>
                        <div className="key-feature-name">
                            Documents
                        </div>
                    </div>
                    <div className="key-feature-det">
                        Key Documents are a key ingredient to how an organization functions. From policies to
                        procedures. Creating a solution where everything comes in one place with approval
                        management and collaboration.
                    </div>
                </div>
                <div className="key-feature">
                    <div className="key-feature-top">
                        <div className="key-feature-icon"><i className="ic-key-feature5"/></div>
                        <div className="key-feature-name">
                            Groups
                        </div>
                    </div>
                    <div className="key-feature-det">
                        Every organisation has departments and then groups within the departments or some that
                        just work on projects.<br/><br/>
                        By creating groups it creates interests and a sense of belonging – The challenge is to
                        always keep them challenged
                    </div>
                </div>
                <div className="key-feature">
                    <div className="key-feature-top">
                        <div className="key-feature-icon"><i className="ic-key-feature6"/></div>
                        <div className="key-feature-name">
                            Tasks
                        </div>
                    </div>
                    <div className="key-feature-det">
                        Great customer service has to do with timely execution - A simple task management module
                        that allows everyone on Konnect to ensure their tasks are completed by reminders and
                        escalations
                    </div>
                </div>
            </div>
            <div className="lg-dt-features">
                <div className="lg-dt-feature">
                    <div className="dt-feature-img">
                        <img src={detFeature1} alt="#"/>
                    </div>
                    <div className="dt-feature-ab">
                        <div className="dt-feature-name">News Feed and Communication</div>
                        <div className="dt-feature-dis">
                            A corporate news page where interaction of all employees and the organisation takes
                            place while also creating individual newsfeeds to keep interactions more
                            fun.<br/><br/>
                            We believe each project and group also needs regular updated which can be managed
                            and easy to look at and thats what we do.
                        </div>
                    </div>
                </div>
                <div className="lg-dt-feature">
                    <div className="dt-feature-ab">
                        <div className="dt-feature-name">Communication Centre</div>
                        <div className="dt-feature-dis">
                            Konnect boasts a complete communication centre allowing for users to interact with
                            one another in any means possible.<br/><br/>
                            Whether be it using chat, audio, video or communication with the whole business, its
                            always as easy as click 1, 2, 3.
                        </div>
                    </div>
                    <div className="dt-feature-img">
                        <img src={detFeature2} alt="#"/>
                    </div>
                </div>
                <div className="lg-dt-feature">
                    <div className="dt-feature-img">
                        <img src={detFeature3} alt="#"/>
                    </div>
                    <div className="dt-feature-ab">
                        <div className="dt-feature-name">Solution Availability</div>
                        <div className="dt-feature-dis">
                            The solution is available on any device. Simple and easy to use - Connect to Konnect
                            via the web without requiring to download anything via our easy to use web portal or
                            use Konnect via our apps available for both Android and iOS.<br/><br/>
                            A simple one stop solution to resolve all your communication needs while bringing
                            efficiencies.
                        </div>
                    </div>
                </div>
            </div>
            <div className="m-msg">
                What makes us different?
            </div>
            <div className="n-msg">
                Our Solution - A one stop shop for your organizations needs, with customized<br/> solutions,
                which can be onsite solutions or hosted solutions
            </div>
            <div className="s-msg">
                “Konnect allows us to ensure our tasks are completed or they are taken to the next
                level<br/> which ensures the items are responded to and internal and external customers are
                always satisfied.”
            </div>
            <div className="lg-banner">
                Unlock the power of your organisation now!
            </div>
            {/*<div className="m-msg">*/}
            {/*    Select the plan that suits you.<br/>Upgrade, downgrade, or cancel anytime.*/}
            {/*</div>*/}
            {/*<div className="n-msg">*/}
            {/*    A solution that helps every organisation from startups to corporate giants.<br/>Making work more*/}
            {/*    streamlined by creating follow ups and processes which are monitored via systems*/}
            {/*</div>*/}
            {/*<div className="prices-plans">*/}
            {/*    <div className="price-plan">*/}
            {/*        <div className="m-msg">Monthly Plan</div>*/}
            {/*        <div className="n-msg">Simplest plan available</div>*/}
            {/*        <div className="m-msg">*/}
            {/*            $25/ <span style={{fontSize: "14px"}}>MONTH/USER</span>*/}
            {/*        </div>*/}
            {/*        <div className="n-msg">*/}
            {/*            Unlimited Projects & Groups<br/><br/>Team Collaboration<br/><br/>Communication*/}
            {/*            Center<br/><br/>20 GB Per Organisation<br/><br/>*/}
            {/*        </div>*/}
            {/*        <div className="plan-btn-hld">*/}
            {/*            <div className="plan-btn">CHOOSE THE PLAN</div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    <div className="price-plan" style={{borderColor: "#405E6B"}}>*/}
            {/*        <div className="m-msg">Quarterly Plan</div>*/}
            {/*        <div className="n-msg">Simplest plan available</div>*/}
            {/*        <div className="m-msg">*/}
            {/*            $60/ <span style={{fontSize: "14px"}}>QUARTERLY/USER</span>*/}
            {/*        </div>*/}
            {/*        <div className="n-msg">*/}
            {/*            Unlimited Projects & Groups<br/><br/>Team Collaboration<br/><br/>Communication*/}
            {/*            Center<br/><br/>25 GB Per Organisation<br/><br/>*/}
            {/*        </div>*/}
            {/*        <div className="plan-btn-hld">*/}
            {/*            <div className="plan-btn" style={{background: "#405E6B"}}>CHOOSE THE PLAN</div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    <div className="price-plan">*/}
            {/*        <div className="m-msg">Yearly Plan</div>*/}
            {/*        <div className="n-msg">Everything you need</div>*/}
            {/*        <div className="m-msg">*/}
            {/*            $144/ <span style={{fontSize: "14px"}}>YEARLY/USER</span>*/}
            {/*        </div>*/}
            {/*        <div className="n-msg">*/}
            {/*            Unlimited Projects & Groups<br/><br/>Team Collaboration<br/><br/>Communication*/}
            {/*            Center<br/><br/>30 GB Per Organisation<br/><br/>*/}
            {/*        </div>*/}
            {/*        <div className="plan-btn-hld">*/}
            {/*            <div className="plan-btn">CHOOSE THE PLAN</div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <div className="m-msg">
                Start your free trial now!
            </div>
            <div className="n-msg">
                Register for a 14 days free trial and get the opportunity to get the<br/>maximum out of your
                teams while reducing the work load
            </div>
            <div className="lg-footer" style={{marginTop: "15px"}}>
                <div className="lg-footer-col">
                    <div style={{width: "200px"}}>
                        <img src={systemLogo} alt="#"/>
                    </div>
                    <div style={{fontWeight: "bolder", margin: "15px", fontSize: "14px"}}>CONTACT US<br/>ADDRESS
                    </div>
                </div>
                <div className="lg-footer-col" style={{alignItems: "center"}}>
                    <div style={{fontSize: "24px", fontWeight: "bolder"}}>A Corporate Social Solution</div>
                    <div>Work from home the way it should be Easy – Effective - Efficient</div>
                    <div style={{fontSize: "14px", marginTop: "15px"}}>
                        E-MAIL<br/>konnect@miletap.com<br/>info@konnect.im
                    </div>
                </div>
                <div className="lg-footer-col" style={{alignItems: "start"}}>
                    <div>A Product of</div>
                    <div style={{width: "200px"}}>
                        <img src={miletapLogo} alt="#"/>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default AuthFoooterContent
