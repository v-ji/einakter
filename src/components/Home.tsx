import React from 'react';
import {Helmet} from 'react-helmet';
import {Link, useHistory} from 'react-router-dom';
import {Trans, t} from '@lingui/macro';

export default function Home () {
  const history = useHistory();

  return (
    <div className="page p-4 mt-8 markdown max-w-full">
      <Helmet>
        <title>
          Einakter:
          {' '}
          {t`The Database of German-Language One-Act Plays 1740–1850`}
        </title>
      </Helmet>
      <section className="flex flex-col lg:flex-row">
        <article className="self-center mx-12 my-24">
          <h1>
            <Trans>
              The Database of<br/>German-Language<br/>One-Act Plays<br/>1740–1850
            </Trans>
          </h1>
          <strong>
            <Trans>Edited by Dîlan Canan Çakir and Frank Fischer</Trans>
          </strong>
          <p>
            <Trans>
              Our aim is to provide a general quantitative overview of one-act
              plays written in German between the mid-18th and mid-19th
              centuries.
            </Trans>
          </p>
          <button
            className="rounded-lg bg-primary px-4 py-2 drop-shadow-lg hover:drop-shadow-md text-neutral-100"
            onClick={() => history.push('/about')}
          >
            <Trans>About the project</Trans>
          </button>
        </article>
        <Link to="/plays" className="relative w-full h-auto overflow-hidden drop-shadow-2xl rounded-lg">
          <span className="scroll-animation absolute overflow-hidden">
            <img
              src="/database.png"
              alt="Database snapshot"
              title='Plays'
            />
            <img
              src="/database.png"
              alt="Database snapshot"
              title='Plays'
            />
            <img
              src="/database.png"
              alt="Database snapshot"
              title='Plays'
            />
            <img
              src="/database.png"
              alt="Database snapshot"
              title='Plays'
            />
          </span>
        </Link>
      </section>
    </div>
  );
}
