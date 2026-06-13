'use client';

import { useEditor } from '@/context/EditorContext';
import {
  Type,
  Image as ImageIcon,
  Briefcase,
  FileType,
  CheckSquare,
  Hash,
  Calendar,
  GraduationCap,
  User,
  Globe,
  Building,
  Mail,
  Phone,
  ScanBarcode,
  QrCode,
  Shapes,
  MapPin,
  Sticker,
  Droplet,
} from 'lucide-react';

const categories = [
  {
    title: 'Personal & Identity',
    items: [
      {
        label: 'Profile Picture',
        variableId: '{{profile_picture}}',
        type: 'image',
        icon: User,
      },
      {
        label: 'Full Name',
        variableId: '{{full_name}}',
        type: 'text',
        icon: Type,
      },
      {
        label: "Father's Name",
        variableId: '{{fathers_name}}',
        type: 'text',
        icon: Type,
      },
      {
        label: "Mother's Name",
        variableId: '{{mothers_name}}',
        type: 'text',
        icon: Type,
      },
      {
        label: 'Date of Birth',
        variableId: '{{date_of_birth}}',
        type: 'text',
        icon: Calendar,
      },
      {
        label: 'Blood Group',
        variableId: '{{blood_group}}',
        type: 'text',
        icon: Droplet,
      },
      { label: 'Gender', variableId: '{{gender}}', type: 'text', icon: User },
      {
        label: 'Nationality',
        variableId: '{{nationality}}',
        type: 'text',
        icon: Globe,
      },
    ],
  },
  {
    title: 'Academic & Program Details',
    items: [
      {
        label: 'Institution Name',
        variableId: '{{institution_name}}',
        type: 'text',
        icon: Building,
      },
      {
        label: 'Course/Program Name',
        variableId: '{{course_name}}',
        type: 'text',
        icon: GraduationCap,
      },
      {
        label: 'Department/Faculty',
        variableId: '{{department}}',
        type: 'text',
        icon: Briefcase,
      },
      {
        label: 'Batch/Session',
        variableId: '{{session}}',
        type: 'text',
        icon: Calendar,
      },
      {
        label: 'Passing Year',
        variableId: '{{passing_year}}',
        type: 'text',
        icon: Hash,
      },
      {
        label: 'Student ID',
        variableId: '{{student_id}}',
        type: 'text',
        icon: FileType,
      },
      { label: 'Roll No.', variableId: '{{roll}}', type: 'text', icon: Hash },
      {
        label: 'Class',
        variableId: '{{class}}',
        type: 'text',
        icon: GraduationCap,
      },
      {
        label: 'Section',
        variableId: '{{section}}',
        type: 'text',
        icon: Briefcase,
      },
      {
        label: 'Reg. Number',
        variableId: '{{registration_number}}',
        type: 'text',
        icon: Hash,
      },
    ],
  },
  {
    title: 'Result & Grading',
    items: [
      {
        label: 'CGPA / GPA',
        variableId: '{{cgpa}}',
        type: 'text',
        icon: GraduationCap,
      },
      {
        label: 'Total Marks',
        variableId: '{{total_marks}}',
        type: 'text',
        icon: Hash,
      },
      {
        label: 'Obtained Marks',
        variableId: '{{obtained_marks}}',
        type: 'text',
        icon: Hash,
      },
      {
        label: 'Letter Grade',
        variableId: '{{letter_grade}}',
        type: 'text',
        icon: Type,
      },
      {
        label: 'Division / Class',
        variableId: '{{division}}',
        type: 'text',
        icon: Briefcase,
      },
      {
        label: 'Marks Table',
        variableId: '{{marks_table}}',
        type: 'text',
        icon: FileType,
      },
    ],
  },
  {
    title: 'Corporate & Professional',
    items: [
      {
        label: 'Company Name',
        variableId: '{{company_name}}',
        type: 'text',
        icon: Building,
      },
      {
        label: 'Designation/Job Title',
        variableId: '{{designation}}',
        type: 'text',
        icon: Briefcase,
      },
      {
        label: 'Employee ID',
        variableId: '{{employee_id}}',
        type: 'text',
        icon: FileType,
      },
      {
        label: 'Joining Date',
        variableId: '{{joining_date}}',
        type: 'text',
        icon: Calendar,
      },
    ],
  },
  {
    title: 'Contact Information',
    items: [
      {
        label: 'Phone/Mobile',
        variableId: '{{phone_number}}',
        type: 'text',
        icon: Phone,
      },
      {
        label: 'Email Address',
        variableId: '{{email_address}}',
        type: 'text',
        icon: Mail,
      },
      {
        label: 'Website',
        variableId: '{{website_url}}',
        type: 'text',
        icon: Globe,
      },
      {
        label: 'Address',
        variableId: '{{address}}',
        type: 'text',
        icon: MapPin,
      },
      {
        label: 'Emergency Contact Name',
        variableId: '{{emergency_contact_name}}',
        type: 'text',
        icon: Phone,
      },
      {
        label: 'Emergency Contact Number',
        variableId: '{{emergency_contact_number}}',
        type: 'text',
        icon: Hash,
      },
    ],
  },
  {
    title: 'Validation & Security',
    items: [
      {
        label: 'Issue Date',
        variableId: '{{issue_date}}',
        type: 'text',
        icon: Calendar,
      },
      {
        label: 'Valid Till Date',
        variableId: '{{expire_date}}',
        type: 'text',
        icon: Calendar,
      },
      {
        label: 'Certificate Serial No',
        variableId: '{{serial_no}}',
        type: 'text',
        icon: Hash,
      },
      {
        label: 'Tracking ID',
        variableId: '{{tracking_id}}',
        type: 'text',
        icon: Hash,
      },
      {
        label: 'QR Code',
        variableId: '{{qr_code}}',
        type: 'image',
        icon: QrCode,
      },
      {
        label: 'Barcode',
        variableId: '{{barcode}}',
        type: 'image',
        icon: ScanBarcode,
      },
      {
        label: 'Official Seal/Stamp',
        variableId: '{{official_seal}}',
        type: 'image',
        icon: Sticker,
      },
      {
        label: 'Signature',
        variableId: '{{signature}}',
        type: 'image',
        icon: CheckSquare,
      },
      { label: 'Logo', variableId: '{{logo}}', type: 'image', icon: ImageIcon },
    ],
  },
  {
    title: 'Static UI / Design',
    items: [
      { label: 'Custom Text', variableId: '', type: 'text', icon: Type },
      {
        label: 'Shapes',
        variableId: '{{shape_type}}',
        type: 'image',
        icon: Shapes,
      },
      {
        label: 'Icons',
        variableId: '{{icon_name}}',
        type: 'image',
        icon: MapPin,
      },
      {
        label: 'Watermark',
        variableId: '{{watermark}}',
        type: 'image',
        icon: ImageIcon,
      },
    ],
  },
];

export default function Sidebar() {
  const { addElement } = useEditor();

  const handleAddText = (content: string, variableId: string) => {
    addElement({
      type: 'text',
      content: content,
      variableId: variableId,
      x: 100,
      y: 100,
      width: 200,
      height: 40,
      fontSize: 24,
      color: '#000000',
      textAlign: 'left',
      fontWeight: 'normal',
    });
  };

  const handleAddImage = (label: string, variableId: string) => {
    // Generate placeholder based on variableId
    let content = 'https://placehold.co/150x150/png?text=Image';
    let width = 150;
    let height = 150;

    if (variableId === '{{signature}}') {
      content = 'https://placehold.co/200x80/png?text=Signature';
      width = 200;
      height = 80;
    } else if (variableId === '{{logo}}') {
      content = 'https://placehold.co/150x150/png?text=Logo';
    } else if (variableId === '{{qr_code}}') {
      content = 'https://placehold.co/100x100/png?text=QR';
      width = 100;
      height = 100;
    } else if (variableId === '{{barcode}}') {
      content = 'https://placehold.co/200x50/png?text=Barcode';
      width = 200;
      height = 50;
    } else if (variableId === '{{profile_picture}}') {
      content = 'https://placehold.co/150x150/png?text=Profile';
    }

    addElement({
      type: 'image',
      content,
      variableId,
      x: 100,
      y: 100,
      width,
      height,
    });
  };

  const handleAddItem = (item: {
    type: string;
    label: string;
    variableId: string;
  }) => {
    if (item.type === 'text') {
      handleAddText(item.variableId || item.label, item.variableId);
    } else {
      handleAddImage(item.label, item.variableId);
    }
  };

  return (
    <div className="w-72 bg-white border-r border-gray-200 flex flex-col h-full shrink-0 shadow-sm z-10 overflow-y-auto custom-scrollbar">
      <div className="p-4 border-b border-gray-100 sticky top-0 bg-white z-10">
        <h2 className="font-semibold text-gray-800">Fields & Elements</h2>
        <p className="text-xs text-gray-700 mt-1">Click to add to canvas</p>
      </div>

      <div className="p-4 flex flex-col gap-6">
        {categories.map((category, catIdx) => (
          <div key={catIdx}>
            <h3 className="text-sm font-semibold text-gray-800 mb-2 uppercase tracking-wide">
              {category.title}
            </h3>
            <div className="grid grid-cols-1 gap-2">
              {category.items.map((item, itemIdx) => (
                <button
                  key={itemIdx}
                  onClick={() => handleAddItem(item)}
                  className="flex items-center gap-3 p-2 bg-gray-50 border border-gray-200 rounded hover:bg-gray-100 hover:border-gray-300 transition text-sm text-gray-900 text-left"
                  title={item.variableId}
                >
                  <item.icon size={16} className="text-gray-700 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
