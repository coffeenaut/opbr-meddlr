import {useState, useEffect} from 'react'
import BookmarkIcon from '@heroicons/react/20/solid/BookmarkIcon'
import XIcon from '@heroicons/react/20/solid/XMarkIcon'
import ShareIcon from '@heroicons/react/20/solid/ShareIcon'
import ClipboardIcon from '@heroicons/react/20/solid/ClipboardIcon'
import BookIcon from '@heroicons/react/20/solid/BookOpenIcon'
import PhotoIcon from '@heroicons/react/20/solid/PhotoIcon'
import PageTableContents from '../components/PageTableContents';
import BookOpenIcon from '@heroicons/react/20/solid/BookOpenIcon'

const Usage = () => {
    const [homeCategorySelectValue, setHomeCategorySelectValue] = useState('')
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
  const { nestedHeadings } = getHeadingsData()
  const headers = {
    usage: "How to use",
    homepage: "Homepage",
    build: "Medal Builder",
    drag: "Drag and Drop",
    scroll: "Content Scrolling",
    bookmark: "Medal Bookmarks",
    share: "Sharing Medals",
    browse: "Medal Browsing",
    icons: "Icons"

  }
  const links = {
    githubPrivacy: "https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement",
    discordContact: "https://discordapp.com/users/223135128908595202"
  }
  const texts = {
    usage: "Meddlr is designed to feel intuitive and familiar to in-game controls regarding medal mechanics. The contents of the page is not intended for consumption, however if you are here reading, then I acknowledge you may need some guidance for the tool. This is an overview of site controls and functions",
    homepage: "Meddlr is a tool focused on the medals mechanics for the game One Piece: Bounty Rush. Information provided by the app is community-sourced from different online forums. Medal information is sourced from github repo MetaSharpNet and most Medal sets are by /u/romanpuss. The dashboard on the homepage displays medal sets aggregated from different online forums using their expertise and knowledge of the game. Sets found here are suggestions based around specific game mechanics such as 'damage' or 'skill 1 cooldown' and are categorized as such. Sets on the homepage can be filtered to these categories and clicking on a set will bring the set of medals to display on the medal platform.",
    homepageNote: "*all sets on the homepage are shown at random, each time the dashboard loads, new filters and sets will load.",
    build: "Medal building is one of the primary purposes of Meddlr and allows users to quickly find medals and drop their selected medals into a set for use on a character. When medals are dropped into one of the three medal slots, Meddlr will calculate matching medal criteria to display any applicable in-game traits when used on a character for the corresponding set of medals. Traits will automatically be limited to the in-game limits and will display red text when the limit is reached. Hovering over the extra trait value will show the total number (without limits). Character specific traits (e.g. When character is of type 'Straw Hat Pirates') may go over the limit for a trait may display incorrectly. It is up to the user to decide if the trait is valid; in-game traits applied may not be as rewarding.",
    drag: "Meddlr features a drag and drop function similar to in-game mechanics to give users intuitive interactivity when medal building. To begin, click (tap), hold, and drag a medal from the medal list. When a medal is in a 'drag state', medal portraits will be highlighted indicating acceptable drop areas.",
    dragNotes: "*dragging functionality is limited to medals from the medal list in 'build' and 'browse' modules.",
    editMedal: "Medals will randomly generate extra traits when dropped into the medal set (favoring max values). You can change extra trait values by clicking on edit button directly under the medal. ",
    saveMedal: "After adjusting the extra trait value, the checkmark on the top-left of the edit window will save the changes. Extra traits will automatically be applied to the list of traits",
    scrollMobile: "Scrolling on mobile or smaller resolution screens can be tricky due to drag functionality of medals. When dragging medals from the medal list, try tapping on negative spaces to scroll through the list.",
    bookmark: "Medals sets can be saved and reloaded in your bookmarks stored in Meddlr. To save a medal set, click save under the medals in your set and give it a name. You can access these medals anytime in the 'build' section by clicking the bookmark icon.",
    bookmarkNotes: "The bookmarking feature stores medal sets in your browser cookies. You can only view/edit saved medals on the same device you used to save the set. You cannot access medals saved on a different device.",
    setManagement: "To edit existing saved medals: load the medal set from your bookmarks, make any necessary changes, and save the set under the same name. This will overwrite your existing medal set. To save a copy of the medal set or branch out from the set, change the name of the medal set and Meddlr will store a new set under the new name, while keeping your initial set intact. Delete any set from you bookmarks by clicking 'Delete' under any saved sets.",
    share: "You can share medal sets online by clicking on the share icon. Copy the link shown by clicking on the clipboard icon to store the link to your clipboard and paste to your favorite social sphere. By default, traits generated during the build will carry over in the link so users viewing the shared set can see the traits you set. Unchecking the 'include traits' option to link to a generic version of the same medals with randomly generated traits.",
    viewSet: "Links shared from Meddlr will display a set of medals that you or someone has previously built. Traits for the set will show under the shared set",
    capture: "To save an image of the set for locally to your device, click on the image icon in the top-right when viewing a shared set. You will have the option to save the stack (medal images with names) or a card (stack with traits).",
    browse: "Browsing medals from the Meddlr medal list can make it easier to find medals with search and filter options. Select browse from the navigation to load the browse module. Medals will display all applicable traits (primary and extra), values, and tags for a medal. You can view one medal at a time on this module",
    icons: "Below is a list of icons and functionality to note when using Meddlr"
  }
    return (
        <>
        <div className='flex justify-evenly'>
            <div className='flex w-full lg:w-3/4'>
                <div className="lg:max-h-[75vh] overflow-y-auto px-4">
                    <main>
                    <h2 id="usage" className='content-header'>{headers.usage}</h2>
                        <div className='content-text'>{texts.usage}</div>
                        <h2 id="homepage" className='content-header'>{headers.homepage}</h2>
                        <div className='flex-col lg:flex lg:justify-center'>
                            <div className='content-text'>{texts.homepage}</div>
                            <video className='lg:h-[350px]' autoPlay loop muted>
                                <source type="video/webm" src='/opbr-meddlr/usage/tut-categorySelect.webm' />
                            </video>
                        </div>
                        <div className='text-sm text-center'>{texts.homepageNote}</div>
                        <h2 id="build" className='content-header'>{headers.build}</h2>
                        <div className='content-text'>{texts.build}</div>
                        <h3 id="dragndrop" className='content-header'>{headers.drag}</h3>
                        <div className='content-text'>{texts.drag}</div>
                        <div className="flex w-full justify-center lg:h-[350px]">
                            <video autoPlay loop muted>
                                <source type="video/webm" src='/opbr-meddlr/usage/tut-dragndrop.webm' />
                            </video>
                        </div>
                        <div className='text-sm text-center'>{texts.dragNotes}</div>
                        <div className='content-text'>{texts.editMedal}</div>
                        <div className="flex-col lg:flex w-full justify-center lg:h-[450px]">
                            <video autoPlay loop muted>
                                <source type="video/webm" src='/opbr-meddlr/usage/tut-editMedal.webm' />
                            </video>
                        </div>
                        <div className='content-text'>{texts.saveMedal}</div>
                        <h2 id="changes" className='content-header'>{headers.scroll}</h2>
                        <div className='content-text'>{texts.scrollMobile}</div>
                        <h2 id="advice" className='content-header'>{headers.bookmark}</h2>
                        <div className='content-text'>{texts.bookmark}</div>
                        <div className="flex-col lg:flex w-full justify-center lg:h-[350px]">
                        <video autoPlay loop muted>
                            <source type="video/webm" src='/opbr-meddlr/usage/tut-bookmark.webm' />
                        </video>
                        </div>
                        <div className='content-text'>{texts.bookmarkNotes}</div>
                        <div className='content-text'>{texts.setManagement}</div>
                        <h3 id="endorsement" className='content-header'>{headers.share}</h3>
                        <div className='content-text'>{texts.share}</div>
                        <div className='content-text'>{texts.viewSet}</div>
                        <div className='content-text'>{texts.capture}</div>
                        <h3 id="browse" className='content-header'>{headers.browse}</h3>
                        <div className='content-text'>{texts.browse}</div>
                        
                    </main>  
                </div>
            </div>
            <div className='w-1/4 hidden lg:flex justify-center'>
                <PageTableContents nestedHeadings={nestedHeadings} />
            </div>

        </div>
    </>
     )
}
export default Usage