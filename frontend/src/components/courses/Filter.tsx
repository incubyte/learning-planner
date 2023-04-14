import { useState } from "react";
import "../../css/courses/Filter.css";

interface FilterProps {
  tags: string[];
}

const Filter = ({ tags }: FilterProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const Tags = isExpanded ? tags : tags.slice(0, 8);
  return (
    <div className="filterTagsContainer">
      <h4 className="filterTagsHeading">Explore By Tags</h4>

      <div className="filterTagsList">
        {Tags.map((tag, index) => (
          <span key={index} className="filterTags">
            {tag}
          </span>
        ))}
      </div>

      {tags.length > 8 && (
        <>
          <button className="toggleButton" onClick={toggleExpand}>
            {isExpanded ? (
              <>
                <span className="toggleText">Show Less</span>
              </>
            ) : (
              <>
                <span>Show More</span>
              </>
            )}
          </button>
        </>
      )}
    </div>
  );
};

export default Filter;
