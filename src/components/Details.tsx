import React, {useEffect, useContext} from 'react';
import {useLocation, useParams} from "react-router-dom";
import {Table, Row, Col} from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import {Helmet} from "react-helmet";
import {Trans} from '@lingui/macro';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Authors from './Authors';
import AuthorInfo from './AuthorInfo';
import Dictionaries from './Dictionaries';
import Years from './Years';
import IdLink from './IdLink';
import BasedOn from './BasedOn';
import {EinakterContext} from '../context';
import {CastMember, Play} from '../types';

const groupIcon = <FontAwesomeIcon icon="users" size="sm" title="Group"/>;

export default function Details () {
  const { id } = useParams<{id: string}>();
  const { pathname } = useLocation();
  const { plays: data } = useContext(EinakterContext);

  const play: Play | undefined = data.find((p: Play) => p.slug === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  if (!play) {
    return <strong><Trans>No such play</Trans></strong>;
  }
  
  const {
    title,
    subtitle,
    authors = [],
    cast,
    comments,
    created,
    dictionaries,
    editions,
    formalia,
    ids,
    keywords,
    numberOfScenes,
    premiered,
    printed,
    reviews,
    setting,
    location,
    basedOn,
  } = play;

  const authorNames = authors.map(a => a.pseudonym || a.name || '').join(' · ');
  const pageTitle = authorNames ? `${authorNames}: ${title}` : title;

  return (
    <div className="details">
      <Helmet>
        <title>Einakter: {pageTitle}</title>
      </Helmet>
      <Row>
        <Col>
          <hgroup>
            <h2>
              <Authors authors={authors}/>
            </h2>
            <h1>{title}</h1>
            {subtitle && <h3>{subtitle}</h3>}
          </hgroup>
        </Col>
        <Col>
          <div className="author-info-container">
            {authors.filter(a => Boolean(a.wikidata)).map(a => (
              <AuthorInfo
                key={a.wikidata}
                fullname={a.name || ''}
                wikidataId={a.wikidata || ''}
              />
            ))}
          </div>
        </Col>
      </Row>
      <Table>
        <tbody>
          {comments && (
            <tr>
              <th>
                <Trans>Comments</Trans>
              </th>
              <td>
                <ul>
                  {comments.map((c, i) => (
                    <li key={`comment-${i}`}>
                      <ReactMarkdown>{c}</ReactMarkdown>
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          )}
          {reviews && (
            <tr>
              <th>
                <Trans>Reviews</Trans>
              </th>
              <td>
                <ul>
                  {reviews.map((r, i) => (
                    <li key={`review-${i}`}>
                      <ReactMarkdown>{r}</ReactMarkdown>
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          )}
          <tr className="dates">
            <th>
              <Trans>Dates</Trans>
            </th>
            <td>
              <Years written={created} premiere={premiered} print={printed}/>
            </td>
          </tr>
          {numberOfScenes && (
            <tr>
              <th>
                <Trans>Number of Scenes</Trans>
              </th>
              <td>{numberOfScenes}</td>
            </tr>
          )}
          {ids && (
            <tr>
              <th>
                <Trans>Links</Trans>
              </th>
              <td>
                <ul>
                  {ids.dracor && (
                    <li>DraCor: <IdLink id={ids.dracor} type="dracor"/></li>
                  )}
                  {ids.wikidata && (
                    <li>
                     Wikidata: <IdLink id={ids.wikidata} type="wikidata"/>
                    </li>
                  )}
                  {ids.weber && (
                    <li>
                      Weber-Gesamtausgabe: <IdLink id={ids.weber} type="weber"/>
                    </li>
                  )}
                </ul>
              </td>
            </tr>
          )}
          {editions && (
            <tr>
              <th>
                <Trans>Editions</Trans>
              </th>
              <td>
                <ul>
                  {editions.map(e => (
                    <li key={e.url || e.title}>
                      <a href={e.url}>{e.title}</a>
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          )}
          {cast && (
            <tr>
              <th>
                <Trans>Dramatis personae</Trans>
              </th>
              <td>
                <ul>
                  {cast.map((c: CastMember) => c.group ? (
                    <li key={c.role}>
                      <em>{c.role}</em>
                      <ul>
                      {c.group && c.group.map(member => (
                        <li key={member.name}>
                          {member.name}
                          {member.role && (<i> {member.role}</i> )}
                          {member.gender && ` (${member.gender})`}
                          {' '}
                          {member.isGroup && groupIcon}
                        </li>
                      ))}
                      </ul>
                    </li>
                  ) : (
                    <li key={c.name}>
                      {c.name}
                      {c.role && (<i> {c.role}</i> )}
                      {c.gender && <span> ({c.gender})</span>}
                      {' '}
                      {c.isGroup && groupIcon}
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          )}
          {setting && (
            <tr>
              <th>
                <Trans>Setting</Trans>
              </th>
              <td>{setting}</td>
            </tr>
          )}
          {location?.wikidataId && (
            <tr>
              <th>
                <Trans>Location</Trans>
              </th>
              <td>
                <IdLink id={location.wikidataId} type="wikidata"/>
              </td>
            </tr>
          )}
          {basedOn && (
            <tr>
              <th>
                <Trans>Based on</Trans>
              </th>
              <td>
                <BasedOn refs={basedOn}/>
              </td>
            </tr>
          )}
          {dictionaries && (
            <tr>
              <th>
                <Trans>Dictionaries</Trans>
              </th>
              <td>
                <Dictionaries dictionaries={dictionaries}/>
              </td>
            </tr>
          )}
          {formalia && (
            <tr>
              <th>
                <Trans>Formalia</Trans>
              </th>
              <td>
                <ul>
                  {formalia.map(text => (
                    <li key={text}>{text}</li>
                  ))}
                </ul>
              </td>
            </tr>
          )}
          {keywords && (
            <tr>
              <th>
                <Trans>Keywords</Trans>
              </th>
              <td>
                <ul>
                  {keywords.map(k => (
                    <li key={k}>{k}</li>
                  ))}
                </ul>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}
