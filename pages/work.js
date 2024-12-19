import React from 'react';
import GenericPost from './../components/GenericPost';
import TagList from './../components/TagList';
import Link from 'next/link';
import Image from 'next/image';
function WorkTitle({ title, date, logo, width }) {
  return (
    <div className="flex flex-row gap-5 align-middle">
      {logo && typeof logo !== 'string' && (
        <span className="mr-[5px] self-center !mt-[20px]">LOGO!!</span>
      )}
      {logo && typeof logo == 'string' && (
        <Image
          src={logo}
          width={width || 30}
          height={30}
          objectFit="contain"
          className="max-h-[30px]"
        />
      )}
      <h2 className="w-fit !mt-[25px]">{title}</h2>
      <p className="italic self-center right-0 !mb-0 ml-auto">{date}</p>
    </div>
  );
}

function Alteryx() {
  return (
    <>
      <WorkTitle
        title="Alteryx: Analytics Cloud"
        date="Mar 2022 - now"
        logo="/about/alteryx.png"
      />
      <p>
        - Leading the enablement of an enterprise-ready self-service RBAC{' '}
        {/* <Link
          target="_blank"
          href="https://help.alteryx.com/aac/en/platform/admin/admin-reference/account-management/workspace-management.html#workspace-management"
        > */}
        workspace configuration feature-set
        {/* </Link>{' '} */} via UI & API: workspace management, workspace-admin
        management, & workspace-user management.
      </p>
      <details className="mt-[20px]">
        <summary className="text-[24px]">
          <b>Workspace-Management Documentation</b>
        </summary>
        <iframe
          width="500"
          height="800"
          src="https://help.alteryx.com/aac/en/platform/admin/admin-reference/account-management/workspace-management.html#workspace-management"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </details>
      <p>
        - Spearheded a monolith-to-microfrontend transition of of several
        authentication-based UIs & APIs:{' '}
        <Link
          target="_blank"
          href="https://us1.alteryxcloud.com/auth-portal/sign-in?"
        >
          sign-in
        </Link>
        ,{' '}
        <Link
          target="_blank"
          href="https://us1.alteryxcloud.com/auth-portal/forgot"
        >
          forgot&reset password
        </Link>
        ,{' '}
        <Link
          target="_blank"
          href="https://us1.alteryxcloud.com/auth-portal/register"
        >
          register
        </Link>
        , and <i>auth protected</i> workspace-picker, & OTP confirmation.
      </p>
      <sub className="italic">
        Work Style: remote, highly collaborative across domains & time-zones,
        on-call rotations, regularly interacting with a dozen-ish folks of a
        "large" org.
      </sub>
      <TagList
        hideTitle
        tags={[
          'typescript',
          'react',
          'node',
          'express',
          'sequelize',
          'mysql',
          'CRUD APIs',
          // todo: is this the right name?
          'umzug (migrations)',
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
        logo="/about/medacist.jpeg"
        title="Medacist Solutions Group (Bluesight): RxAuditor Investigate"
        date="Jun 2019 - Mar 2022"
      />
      <iframe
        width="720"
        height="309"
        src="https://www.youtube.com/embed/6yvndHINfsI"
        title="what&#39;s new with medacist? | RxAuditor Investigate"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
      <p>
        From the &quot;Ground-up&quot; flagship product development for
        drug-diversion analytics: designing & building several interactive
        data-driven UIs (dashboards, chat, & forms).
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
      <WorkTitle
        title="CompuWeigh: SmartTruck Lite"
        date="May 2018 - May 2019"
        logo="/about/compuweigh.jpg"
        width="150"
      />
      <img
        src="https://s3-us-west-2.amazonaws.com/grainnet-com/uploads/Company-Profiles/SmartTruck-Lite-Printer_Updated-Screen_Guard_CW.jpg"
        width="200"
      />
      <p>
        {/* TODO: 
        - modal?? what word!? 
        - tortoise VM?!
        - link urls
        */}
        UI of a modal{' '}
        <Link
          href="https://www.grainfeedequipment.com/profiles/compuweigh"
          target="_blank"
          className="underline"
        >
          RFID Truck Processing Terminal
        </Link>{' '}
        for truck-drivers to interact throughout processing facilities.
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
        date="Jan 2015 - Dec 2016"
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
      <div className="m-32" />
      <Medacist />
      <div className="m-32" />
      <CompuWeigh />
      <div className="m-32" />
      <Infinigence />
    </GenericPost>
  );
}
