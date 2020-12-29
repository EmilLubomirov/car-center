import React from "react";
import Pagination from "@material-ui/lab/Pagination";
import PaginationItem from "@material-ui/lab/PaginationItem";
import {Link} from "react-router-dom";

const PaginationComponent = ({pageCount, currentPage, pageUrl, size, color}) =>{

    return (
        <div>
            <Pagination count={pageCount}
                        page={parseInt(currentPage) || 1}
                        renderItem={(item) => (
                            <PaginationItem
                                component={Link}
                                to={`${pageUrl}?page=${item.page}`}
                                {...item}
                            />
                        )}
                        size={size || "medium"}
                        color={color || "standard"}/>
        </div>
    )
};

export default PaginationComponent;