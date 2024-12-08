import React from 'react';
import GenericPost from './../components/GenericPost';
import TagList from './../components/TagList';
import Link from 'next/link';
function WorkTitle({ title, date, logo }) {
  return (
    <div className="flex flex-row gap-5">
      {logo && <span className="mr-[5px] self-center !mt-[20px]">LOGO!!</span>}
      <h2 className="w-fit">{title}</h2>
      <sub className="italic self-center !mt-[20px]">{date}</sub>
    </div>
  );
}

function Alteryx() {
  return (
    <>
      <WorkTitle title="Alteryx: Analytics Cloud" date="2020-present" logo />
      <p>
        Leading the development of an enterprise-ready self-service workspace
        configuration feature-set via UI & API: workspace management,
        workspace-admin management, & workspace-user management.
      </p>
      <p>
        Spearheded a monolith-to-microservice transition of of several
        authentication-based UIs & APIs: sign-in, reset-password,
        workspace-picker, OTP confirmation, password entry & &quot;forgot&quot;
        password uis, & register.
      </p>
      <sub className="italic">
        Work Style: remote, highly collaborative across domains & time-zones,
        on-call rotations, regularly interacting with a dozen-ish folks of a
        "large" org.
      </sub>
      <TagList
        hideTitle
        tags={[
          'CRUD APIs',
          'react',
          'node',
          'express',
          'sequelize',
          // todo: is this the right name?
          'zigzum',
          'typescript',
          'Figma',
          'cross-functional collaboration',
          'docker',
          'kubernetes',
          'gitlab',
          'webpack',
          'rspack',
          'rsbuild',
          'jest',
          'mocha',
          'chai',
          'testing-library',
          'datadog',
          'teleport',
          'pager duty',
          'OIDC',
          'IDP-Broker research',
          'JWT',
          'jira',
          'slack',
          'teams',
        ]}
      />
    </>
  );
}

function Medacist() {
  return (
    <>
      <WorkTitle
        logo
        title="Medacist Solutions Group: RxAuditor Investigate"
        date="2020"
      />
      <p>
        From the &quot;Ground-up&quot; flagship product development for
        drug-diversion analytics: designing & building
        &quot;dashboard&quot;-style UIs with custom designed
        data-visualizations.
      </p>
      <sub className="italic">
        Work Style: in-person & hybrid, highly collaborative across domains &
        time-zones, regularly interacting with less-than-10 folks of a small
        org.
      </sub>
      <TagList
        hideTitle
        tags={[
          'CRUD APIs',
          'react',
          'node',
          'express',
          'sql',
          'flyway',
          'flow (typescript alternate of the time)',
          'Figma',
          'cross-functional collaboration',
          'docker',
          'gitlab',
          'webpack',
          'D3',
          'hiring',
          'role development',
          'engineering-ladder framework creation',
          'jest',
          'mocha',
          'chai',
          'JWT',
          'mattermost',
        ]}
      />
    </>
  );
}

function CompuWeigh() {
  return (
    <>
      <WorkTitle title="CompuWeigh: SmartTruck Lite" date="2016" logo />
      <p>
        {/* TODO: 
        - modal?? what word!? 
        - tortoise VM?!
        - link urls
        */}
        UI of a modal{' '}
        <Link href="/" className="underline">
          farming truck-automation device
        </Link>{' '}
        for truck-drivers to interact with while they drop-off farmed goods at a
        processing facility.
      </p>
      <sub className="italic">
        Work Style: in-person, independent, regularly interacting with
        less-than-10 folks of a small org.
      </sub>
      <TagList
        hideTitle
        tags={['angularjs', 'tortoise SVM', 'webpack', 'D3']}
      />
    </>
  );
}

function Infinigence() {
  return (
    <>
      <WorkTitle
        title="Infinigence: internal Ticket-Based Management system"
        date="2016"
      />
      {/* TODO: hmmm*/}
      <p>
        A from the &quot;Ground-up&quot; ticket-based management system for
        internal team members of a small locally-serving IT-support company:
        CRUD tickets, assign & manage ticket owners, prioritize, time-tracking,
        & an analytics dashboard.
      </p>
      <sub className="italic">
        Work Style: in-person, highly-collaborative, regularly interacting with
        less-than-10 folks of a small org.
      </sub>
      <TagList
        hideTitle
        tags={['javascript', 'html', 'sql', 'php', 'dhtmlx']}
      />
    </>
  );
}

export default function WorkPage() {
  return (
    <GenericPost
      {...{
        title: 'Eric Laursen Work Experience',
        name: 'Work Experience',
        slug: '/work',
        tags: [
          'bio',
          'experience',
          'cv',
          'angularjs',
          'tortoise SVM',
          'webpack',
          'D3',
          'CRUD APIs',
          'react',
          'node',
          'express',
          'sequelize',
          // todo: is this the right name?
          'zigzum',
          'typescript',
          'Figma',
          'cross-functional collaboration',
          'docker',
          'kubernetes',
          'gitlab',
          'rspack',
          'rsbuild',
          'jest',
          'mocha',
          'chai',
          'testing-library',
          'datadog',
          'teleport',
          'pager duty',
          'OIDC',
          'IDP-Broker research',
          'JWT',
          'jira',
        ],
        slugArr: ['work'],
      }}
    >
      <Alteryx />
      <Medacist />
      <CompuWeigh />
      <Infinigence />
    </GenericPost>
  );
}
