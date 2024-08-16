import {useState, useEffect, Suspense} from 'react'
import Spinner from '../components/Spinner';
import PageTableContents from '../components/PageTableContents';

const Disclaimer = () => {
    const getHeadingsData = () => {
        const [nestedHeadings, setNestedHeadings] = useState([]);
        useEffect(() => {
        const headingElements = Array.from(
            document.querySelectorAll("h2, h3")
        );
    
        // Created a list of headings, with H3s nested
        const newNestedHeadings = getNestedHeadings(headingElements);
        setNestedHeadings(newNestedHeadings);
        }, []);
    
        return { nestedHeadings };
    };
    const getNestedHeadings = (headingElements) => {
        const nestedHeadings = [];
    
        headingElements.forEach((heading, index) => {
        const { innerText: title, id } = heading;
    
        if (heading.nodeName === "H2") {
            nestedHeadings.push({ id, title, items: [] });
        } else if (heading.nodeName === "H3" && nestedHeadings.length > 0) {
            nestedHeadings[nestedHeadings.length - 1].items.push({
            id,
            title
            });
        }
        });
    
        return nestedHeadings;
    };
    //  <div className="content-header"><h2 id="disclaimer">Disclaimer</h2></div>
    // <div className="content-text">The information, content, and services provided by Meddlr ("the Application") are for general informational and educational purposes only. By accessing or using the Application, you agree to the following disclaimers:</div>
    // <div className="content-header"><h2 id="warranty">1. No Warranties</h2></div>
    // <div className="content-text">The Application is provided on an "as is" and "as available" basis without any representations or warranties of any kind, either express or implied. Meddlr makes no representations or warranties regarding the accuracy, completeness, reliability, suitability, or availability of the Application or the information, content, or services provided through the Application. Any reliance you place on such information is strictly at your own risk.</div>
    // <div className="content-header"><h2 id="affiliation">2. No Affiliation</h2></div>
    // <div className="content-text">Meddlr is not affiliated, associated, authorized, endorsed by, or in any way officially connected with Bandai Namco Entertainment Inc., or any of its subsidiaries or affiliates. All trademarks, service marks, and company names or logos mentioned in the Application are the property of their respective owners.</div>
    // <div className="content-header"><h2 id="uResponsibility">3. User Responsibility</h2></div>
    // <div className="content-text">You are responsible for ensuring that your use of the Application complies with all applicable laws, regulations, and industry standards. You are also responsible for any decisions or actions you take based on the information provided through the Application. Meddlr is not responsible for any outcomes related to your use of the Application.</div>
    // <div className="content-header"><h2 id="contentChanges">4. Changes to Content</h2></div>
    // <div className="content-text">The content and services provided by the Application may be updated, modified, or removed at any time without prior notice. Meddlr does not guarantee that any content or service will be available at all times.</div>
    // <div className="content-header"><h2 id="pAdvice">5. No Professional Advice</h2></div>
    // <div className="content-text">The information provided by the Application does not constitute professional advice, including but not limited to legal, financial, medical, or technical advice. You should consult with a qualified professional before making any decisions based on the information provided through the Application.</div>
    // <div className="content-header"><h2 id="endorsement">6. No Endorsement</h2></div>
    // <div className="content-text">References to any products, services, processes, or other information by trade name, trademark, manufacturer, or otherwise within the Application do not constitute or imply an endorsement, sponsorship, or recommendation by Meddlr.</div>
    // <div className="content-header"><h2 id="enforcement">7. Governing Law</h2></div>
    // <div className="content-text">This Disclaimer shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law principles.</div>
  const { nestedHeadings } = getHeadingsData()
  const headers = {
    disclaimer: "Disclaimer",
    warranty: "1. No Warranties",
    affiliation: "2. No Affiliation",
    responsibility: "3. User Responsibility",
    changes: "4. Changes to Content",
    advice: "5. No Professional Advice",
    endorsement: "6. No Endorsement",
    enforcement: "7. Liabilities",
    agreement: "Cookie Usage Agreement",
    usage: "Cookie Usage",
    essential: "Essential Cookies",
    functional: "Functional Cookies"

  }
  const links = {
    githubPrivacy: "https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement",
    discordContact: "https://discordapp.com/users/223135128908595202"
  }
  const texts = {
    disclaimer: "The information, content, and services provided by Meddlr ('the Application') are for general informational and educational purposes only. By accessing or using the Application, you agree to the following disclaimers:",
    warranty: "The Application is provided on an 'as is' and 'as available' basis without any representations or warranties of any kind, either express or implied. Meddlr makes no representations or warranties regarding the accuracy, completeness, reliability, suitability, or availability of the Application or the information, content, or services provided through the Application. Any reliance you place on such information is strictly at your own risk.",
    affiliation: "Meddlr is not affiliated, associated, authorized, endorsed by, or in any way officially connected with Bandai Namco Entertainment Inc., or any of its subsidiaries or affiliates. All trademarks, service marks, and company names or logos mentioned in the Application are the property of their respective owners.",
    responsibility: "You are responsible for ensuring that your use of the Application complies with all applicable laws, regulations, and industry standards. You are also responsible for any decisions or actions you take based on the information provided through the Application. Meddlr is not responsible for any outcomes related to your use of the Application.",
    changes: "The content and services provided by the Application is subject to change and may be updated, modified, or removed at any time without prior notice. Meddlr is a community sourced information hub and updates in conjuction with game updates with new medals. Meddlr does not guarantee that any content or service will be available at all times. Should you find any issues or inaccuracies on the site, feel free to open an issue on the GitHub project repo , or alternatively you can reach out on ",
    advice: "The information provided by the Application does not constitute professional advice, including but not limited to legal, financial, medical, or technical advice. Any information regarding medal sets provided by Meddlr or links shared by users should not be considered 'end-game' mechanics and should be considered model data for in game technique and metrics. Any advice followed on here does not garauntee you to get more combos. You should consult with a qualified professional before making any decisions based on the information provided through the Application.",
    endorsement: "References to any products, services, processes, or other information by trade name, trademark, manufacturer, or otherwise within the Application do not constitute or imply an endorsement, sponsorship, or recommendation by Meddlr. Meddlr does not care for and will not ask you any personal information.",
    enforcement: "Meddlr is hosted on Github Pages and is subject to any and all Terms and Conditions stipluated by Github Pages and its parent company. Meddlr is not resposible for any information gathered and used by it's host. Please review the GitHub Prvacy Statement at your discretion ",
    agreement: "By using Meddlr, you agree to the use of cookies as described in this Cookie Usage Agreement. The Application uses cookies for the following purposes:",
    // usage: "We use cookies for the following purposes:",
    essential: "Cookies are used for the operation save/bookmarking feature. Without these cookies, the Application's save/bookmark feature may not function properly.",
    functional: "These cookies enable the Application to remember your preferences, such as saved medal sets, and provide enhanced, more personalized features."

  }
    return (
        <>
        <Suspense fallback={Spinner}>
            <div className='flex justify-between'>
                <div className='flex w-3/4'>
                    <div className="max-h-[75vh] overflow-y-auto px-4">
                        <main>
                        <h2 id="disclaimer" className='content-header'>{headers.disclaimer}</h2>
                            <div className='content-text'>{texts.disclaimer}</div>
                            <h2 id="warranty" className='content-header'>{headers.warranty}</h2>
                            <div className='content-text'>{texts.warranty}</div>
                            <h3 id="affiliation" className='content-header'>{headers.affiliation}</h3>
                            <div className='content-text'>{texts.affiliation}</div>
                            <h3 id="responsibility" className='content-header'>{headers.responsibility}</h3>
                            <div className='content-text'>{texts.responsibility}</div>
                            <h2 id="changes" className='content-header'>{headers.changes}</h2>
                            <div className='content-text'>{texts.changes} <a className="text-primary" href={links.discordContact}>Discord</a></div>
                            <h2 id="advice" className='content-header'>{headers.advice}</h2>
                            <div className='content-text'>{texts.advice}</div>
                            <h3 id="endorsement" className='content-header'>{headers.endorsement}</h3>
                            <div className='content-text'>{texts.endorsement}</div>
                            <h3 id="liability" className='content-header'>{headers.enforcement}</h3>
                            <div className='content-text'>{texts.enforcement} <a className="text-primary" href={links.githubPrivacy}>here</a></div>

                            <h2 id="cookie-agreement" className='content-header'>{headers.agreement}</h2>
                            <div className='content-text'>{texts.agreement}</div>
                            <div className='content-text'>{texts.essential}</div>
                            <div className='content-text'>{texts.functional}</div>
                        </main>  
                    </div>
                </div>
                <div className='flex w-1/4'>
                    <PageTableContents nestedHeadings={nestedHeadings} />
                </div>

            </div>
        </Suspense>
        
    </>
     )
}
export default Disclaimer