'use client';

interface RawWhoIsProps {
    res_whois : Record<string, any>;
}

export default function RawWhoIsInfo({ res_whois } : RawWhoIsProps ) {

    if (!res_whois || res_whois?.length === 0) {
      return <div className="border-b border-gray-300 px-4 py-2 text-center capitalize">No data available</div>;
    }
    return (
        <div className="overflow-y-auto p-6">
          <div className="w-full border border-gray-400 rounded-md bg-gray-200 mb-4 p-4">
            <div>
              <pre className="p-4 rounded-lg ">
                {/* Render data on the screen */}
                {res_whois?.map((entry: any, index: any) => (
                  <div key={index} className="text-black-100">
                    {/* Skip the first time when entry.type === 'comments' */}
                    {entry.type === 'comments' && index === 0 ? null : (
                      <>
                        {entry.type === 'object' && (
                          <div>
                            {/* Render object information */}
                            {entry.attributes.map((attribute: any, attributeIndex: number) => (
                              <div key={attributeIndex}>
                                {`${attribute.name}: ${attribute.values?.join(', ')}`}
                              </div>
                            ))}
                            <div>--------------------------</div>
                            <br />
                            <br />
                          </div>
                        )}
                        {entry.type === 'comments' && (
                          <div>
                            {/* Render comments */}
                            <div dangerouslySetInnerHTML={{ __html: entry.comments.join('<br />') }} />
                          </div>
                        )}
                      </>
                    )}
                  </div>
                ))}
              </pre>
            </div>
          </div>
        </div>
    );
}