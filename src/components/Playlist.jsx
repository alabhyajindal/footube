import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';

export default function Playlist({
  videos,
  setVideos,
  currentVideo,
  changeCurrentVideo,
}) {
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const updatedVideos = reorder(
      videos,
      result.source.index,
      result.destination.index
    );

    setVideos(updatedVideos);
  };

  const draggingItemStyle = (isDragging, draggableStyle) => ({
    userSelect: 'none',
    // Matching item styles to maintain styling during and after drag/drop
    background: isDragging ? '#fefce8' : '',
    boxShadow: isDragging
      ? '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
      : '',
    marginBottom: '0.25rem',
    ...draggableStyle,
  });

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='droppable'>
        {(provided, snapshot) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {videos.map((video, index) => (
              <Draggable key={video.id} draggableId={video.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={draggingItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style
                    )}
                  >
                    <div
                      key={index}
                      className={`cursor-pointer flex items-start gap-3 hover:shadow-md px-2 md:px-4 py-1 ${
                        currentVideo.id === video.id
                          ? 'bg-yellow-200 hover:bg-yellow-200'
                          : ''
                      } 
                    ${
                      currentVideo.id !== video.id ? 'hover:bg-yellow-50' : ''
                    }`}
                      onClick={(e) => changeCurrentVideo(e, index)}
                    >
                      <img
                        src={video.thumb}
                        alt={video.description}
                        className='rounded-md w-32 h-16 object-cover block'
                      />
                      <div className='flex flex-col gap-1'>
                        <p className='text-sm md:text-md font-medium'>
                          {video.title}
                        </p>
                        <p className='text-xs text-slate-600'>
                          {video.subtitle}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
