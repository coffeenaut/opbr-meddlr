import { act, useState } from "react"
const TabPanel = (props) => {
    const tabNames = props.names
    const components = props.components
    const [currentTab, setCurrentTab] = useState(0)
    function closeSideBar() {
        props.closeBar()
    }
    const Tab = (props) => {
        const tindex = props.index 
        function clicked (e) {
            setCurrentTab(tindex)
        }
        const tabName = `${props.name}-tabName-${tindex}`
        return (
            <>
                <div className="flex flex-col">
                    <div onClick={clicked} id={tabName} className={`flex items-center tabPanel-tabName${currentTab === tindex ? " tabPanel-tab-active" : ""}`}>
                        {props.name}
                    </div>
                    <div className={`tabPanel-tabName-bottom ${currentTab === tindex ? " tabPanel-tab-active" : ""}`}></div>
                </div>
                
            </>
        )
    }
    return (
        <>
            <div className="flex flex-col">
                <div className="flex gap-x-2">
                {
                    tabNames.map((t, i) => {
                        return (
                            <>
                            <Tab key={i} index={i} name={t}></Tab>
                            </>
                        )
                    })
                }
                </div>
                <div className="flex">
                    {
                        components.map((C,i) => {
                            return (
                            <>
                                <div className={`tabPanel-component ${currentTab === i ? "tabPanel-activeComponent" : ""}`}>
                                    <C />
                                </div>
                            </>
                            )
                        })
                    }
                </div>
            </div>
    </>
    )
}

export default TabPanel