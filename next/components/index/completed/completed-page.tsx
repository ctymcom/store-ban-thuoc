import { ContentStatus } from './components/content-status';
export function CompletedPage() {
    return <div className="md:flex md:w-3/4 mx-auto mt-10">
            <div className="w-1/2 mx-auto">
                <img src="/assets/img/completed.png" alt="complete" />
            </div>
            <div className="md:w-1/2">
                <ContentStatus/>
            </div>
    </div>
}